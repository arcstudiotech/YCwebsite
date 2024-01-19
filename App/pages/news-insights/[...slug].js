import PageWrapper from 'components/pageWrapper/pageWrapper'
import SinglePost from 'components/singlePost/singlePost'

import { 
	getStandardPageData,
	getRoutes
} from 'lib/fetching'

const Page = ({ initialData, contextData, postData }) => {	
	if (!initialData?.postBy) {
		return (
			<div>
				Nothing was returned. Perhaps a 404?
			</div>
		)
	}

	const {
		postBy: {
			title,
			slug,
			databaseId,
		}
	} = initialData

	return (
		<PageWrapper
			title={title}
			single={true}
			databaseId={databaseId}
			contextData={contextData}
		>
            <SinglePost 
				post={ initialData.postBy } 
				flexibleContent={[]} 
			/>
		</PageWrapper>
	)
}

export async function getStaticPaths(){
	const data = await getRoutes('posts')

	const paths = data.map(({ node }) => {
		return {
			params: {
				slug: [node.slug]
			}
		}
	})

	return {
		paths,
		fallback: true
	}
}

export async function getStaticProps(context) {
	const data = await getStandardPageData(context, null, true, 'Post')

	return {
		props: {
			...data
		}
	}
}

/*
Page.getInitialProps = async context => {
    // console.log('does this run???')
	const postSlug = context.asPath.replace('/news-insights/','')
	const postData = await doQuery(true, POST_DATA, { slug: postSlug })

	const { databaseId } = postData.postBy

	const data = await getStandardPageData(context, databaseId)

	return {
		...data,
		postData
	}
}
*/

export default Page