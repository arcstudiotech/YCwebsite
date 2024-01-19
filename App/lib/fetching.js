import useSWR from "swr"
import getConfig from 'next/config'
import { request } from "graphql-request"

import { GraphQLClient, gql } from 'graphql-request'

import {
	PAGE_DATA, 
	PAGE_DATA_BY_ID,
	PREVIEW_PAGE_DATA,
	OPTIONS_QUERY,
	POST_DATA,
	getRouteQuery
} from 'lib/queries'

const { publicRuntimeConfig: { apiUrl } } = getConfig()

const client = new GraphQLClient(apiUrl, {
	headers: {
		// authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvYWZ0ZXJwYXktY29ycG9yYXRlLnlvdXJjcmVhdGl2ZS5jb20uYXUiLCJpYXQiOjE2MDczMTAzMzIsIm5iZiI6MTYwNzMxMDMzMiwiZXhwIjoxNjM4ODQ2MzMyLCJkYXRhIjp7InVzZXIiOnsiaWQiOiIxIiwidXNlcl9zZWNyZXQiOiJncmFwaHFsX2p3dF81ZmNkOWJjODJjOWU4In19fQ.bE2hdD0yLiP97RI0wTvOhKjFslDUQnGsO0dXTbXN2so"
	}
})

const getUri = (asPath, postType) => {
	let _uri = asPath

	if (!_uri || _uri === '/') {
		_uri = 'home'
	}

	if (!_uri.endsWith('/')) {
		_uri += '/'
	}

	if (postType === 'Post') {
		_uri = _uri.replace('/news-insights/', '').replace('/', '')
	}

	return _uri
}

export const doQuery = (isServer, query, variables, initialData) => {
    if (isServer) {
        return client.request(query, variables)
    } else {
        return useSWR([query, variables], (query, variables) => {
            return client.request(query, variables)
		}, { initialData })
    }
}

export const getRoutes = async postType => {
	const data = await doQuery(true, getRouteQuery(postType))

	return data[postType].edges
}

export const getStandardPageData = async (context, databaseId, isStatic, postType) => {
	const path = (() => {
		if (isStatic) {
			const params = context.params.all || context.params.slug || null

			if (!params) {
				return '/'
			}

			return `/${params.join('/')}/`
		}

		return context.asPath
	})()

	const uri = getUri(path, postType)

	let data = null

	if(databaseId){
		const tempData = await doQuery(true, PAGE_DATA_BY_ID, { databaseId })

		data = {
			pageBy: tempData.page
		}
	}else if(postType === 'Post'){
		data = await doQuery(true, POST_DATA, { slug: uri })
	}else{
		data = await doQuery(true, PAGE_DATA, { uri })
	}
	
	const contextData = await doQuery(true, OPTIONS_QUERY)

	return {
		initialData: data,
		contextData
	}
}

export const getPreviewPageData = async context => {
    const {
        id,
        secret,
        type,
        typeValue
	} = context.query
	
	console.log('ID IS:')
	console.log(id)

	const data = await doQuery(true, PREVIEW_PAGE_DATA, { id })
	const contextData = await doQuery(true, OPTIONS_QUERY)

	return {
		initialData: data,
		contextData
	}
}