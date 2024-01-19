import PageWrapper from 'components/pageWrapper/pageWrapper'
import FlexibleContent from 'components/flexibleContent/flexibleContent'

import { 
	getStandardPageData,
	getRoutes
} from 'lib/fetching'

const Page = ({ initialData, contextData }) => {
	if (!initialData?.pageBy) {
		return (
			<div>
				Nothing was returned. Perhaps a 404?
			</div>
		)
	} 

	const {
		title,
		databaseId,
		slug,
	} = initialData.pageBy

	return (
		<PageWrapper
			title={title}
			slug={slug}
			databaseId={databaseId}
			contextData={contextData}
		>
			<FlexibleContent
				rows={initialData.pageBy.components?.rows}
			/>
		</PageWrapper>
	)
}

export async function getStaticPaths(){
	const data = await getRoutes('pages')

	const exclusions = ['why-firmus'] 
	
	const dataWithExclusions = data.filter(({node}) => !~exclusions.indexOf(node.slug))

	dataWithExclusions.push({
		node: {
			slug: ''
		} 
	})

	const paths = dataWithExclusions.map(({ node }) => {
		return {
			params: {
				all: [node.slug]
			}
		}
	})

	return {
		paths,
		fallback: true
	}
}

export async function getStaticProps(context) {
	const data = await getStandardPageData(context, null, true)

	return {
		props: {
			...data
		}
	}
}

export default Page