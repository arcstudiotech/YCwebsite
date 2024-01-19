import PageWrapper from 'components/pageWrapper/pageWrapper'
import FlexibleContent from 'components/flexibleContent/flexibleContent'

import { getPreviewPageData } from 'lib/fetching'

const Page = ({ initialData, contextData }) => {
	if (!initialData?.page) {
		return (
			<div>
				Nothing was returned for this preview URL.
			</div>
		)
	}

	const {
		title,
		databaseId,
	} = initialData.page

	return (
		<PageWrapper
			title={title}
			databaseId={databaseId}
			contextData={contextData}
		>
			<FlexibleContent
				rows={initialData.page.components?.rows}
			/>
		</PageWrapper>
	)
}

Page.getInitialProps = async context => {
    const data = await getPreviewPageData(context)

	return {
		...data
	}
}

export default Page