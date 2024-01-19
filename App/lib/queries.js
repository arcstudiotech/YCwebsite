import gql from 'graphql-tag'

export const getRouteQuery = postType => `
    query PageRoutesQuery {
        ${ postType }(first: 1000, after: null) {
            edges {
                node {
                    databaseId
                    slug
                }
            }
        }
    }
`

const PageDataFragment = gql`
	fragment PageDataFragment on Page {
		id
		title
		slug
		databaseId
		components {
			rows {
				... on Page_Components_Rows_Splash {
					__typename
					title
					copy
					images {
						image {
							mediaItemUrl
						}
					}
					details {
						block
					}
				}
			}
		}
	}
`

export const POST_DATA = gql`
	query PostData($slug: String!) {
		postBy (
			slug: $slug
		) {
			id
			title
			slug
			databaseId
			content
			featuredImage {
				node {
					mediaItemUrl
				}
			}
			categories {
				nodes {
					name
					slug
				}
			}
			newsFields {
				excerpt
			}
			date
			author {
				node {
					name
				}
			}
		}
		page (
			id: 235,
			idType: DATABASE_ID
		) {
			id
			uri
			link
			title
		}
	}
`

export const GET_CATEGORIES = gql`
	query GetCategories {
		categories(where: {hideEmpty: true}) {
			nodes {
				slug
				name
			}
		}
	}
`

export const PAGE_DATA = gql`
    query PageData($uri: String!) {
        pageBy(
			uri: $uri
		) {
			...PageDataFragment
        }
	}
	
	${ PageDataFragment }
`

export const PAGE_DATA_BY_ID = gql`
    query PageDataById($databaseId: ID!) {
        page(
			id: $databaseId
			idType: DATABASE_ID
		) {
			...PageDataFragment
        }
	}
	
	${ PageDataFragment }
`

export const PREVIEW_PAGE_DATA = gql`
	query PreviewPageData($id: ID!) {
		page (
			id: $id
			idType: DATABASE_ID
			asPreview: true
		) {
			...PageDataFragment
		}
	}
	
	${ PageDataFragment }
`

export const OPTIONS_QUERY = gql`
    query OptionsQuery {
        options {
            options {
                adminEmail
            }
        }
    }
`

export const GET_POSTS = gql`
	query GetPosts (
		$where: RootQueryToPostConnectionWhereArgs
	) {
		posts (
			first: 50
            where: $where
		) {
			nodes {
				id
				title
				content
				date
				link
				featuredImage {
					node {
						mediaItemUrl
					}
				}
				categories {
					nodes {
						name
						slug
					}
				}
				newsFields {
					excerpt
				}
				author {
					node {
						name
					}
				}
			}
		}
	}
`

export const GET_CONTACT_FORM = gql`
	query GetForms {
		form(id: "1379", idType: DATABASE_ID) {
			formFields {
				buttonLabel
				rows {
					columns {
						label
						options
						type
					}
				}
			}
		}
	}
`

export const GET_FORMS = gql`
	query GetForm {
		forms {
			nodes {
				databaseId
				title
				formFields {
					buttonLabel
					rows {
						columns {
							label
							options
							type
						}
					}
				}
			}
		}
	}
`

export const SUBMIT_FORM = gql`
    mutation SUBMIT_FORM (
        $data: String
    ) {
        submitForm (
            input: {
                data: $data
                clientMutationId: "uniqueId"
            }
        ) {
            success
        }
    }
`
