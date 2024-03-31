import {atomFamily, selectorFamily} from "recoil"
import axios from "axios"
import {token} from "../../config.js"

export const responseAtomFamily = atomFamily({
    key : "responseAtomFamily",
    default : selectorFamily({
        key :"responseSelectorFamily",
        get : (id)=>async()=>{
            try
            {
                let endCursor=null; 
                let hasNextPage=true; 
                let res; 
                let allPullRequests = []
                while(hasNextPage)
                {
                const overviewBody = {
                    query: `query{
                        user(login: "${id.username}") {
                          avatarUrl
                          bio
                          name
                          createdAt
                          followers {
                            totalCount
                          }
                          following {
                            totalCount
                          }
                          repositories(first: 1) {
                            totalCount
                            edges {
                              node {
                                id
                                name
                                isPrivate
                                viewerHasStarred
                                stargazerCount
                                primaryLanguage {
                                  name
                                }
                                pullRequests(first: 1, orderBy: {field: CREATED_AT, direction: ASC}) {
                                  nodes {
                                    createdAt
                                  }
                                }
                              }
                            }
                          }
                          contributionsCollection {
                            totalCommitContributions
                            totalRepositoryContributions
                            totalIssueContributions
                            totalPullRequestContributions
                            commitContributionsByRepository {
                              repository {
                                name
                                owner{
                                    login
                                }
                              }
                            }
                            pullRequestContributions(first: 10, after : "${endCursor}") {
                              edges {
                                node {
                                  pullRequest {
                                    title
                                    createdAt
                                    mergedAt
                                    merged
                                  }
                                }
                              }
                              pageInfo{
                                hasNextPage
                                endCursor
                              }
                            }
                            issueContributions(first: 2) {
                              edges {
                                node {
                                  issue {
                                    title
                                    createdAt
                                  }
                                }
                              }
                            }
                            contributionCalendar {
                              totalContributions
                              months {
                                name
                                totalWeeks
                                firstDay
                                year
                              }
                            }
                          }
                        }
                      }`}


              const contributionsBody = {
                query : `query{
                    user(login: "${id.username}") {
                      contributionsCollection(
                        from: "${id.startDate}"
                        to: "${id.endDate}"
                      ){
                        totalCommitContributions
                        totalRepositoryContributions
                        totalIssueContributions
                        totalPullRequestContributions
                        commitContributionsByRepository {
                          repository {
                            name
                          }
                        }
                        pullRequestContributions(first: 10) {
                          edges {
                            node {
                              pullRequest {
                                title
                                createdAt
                                mergedAt
                                merged
                              }
                            }
                          }
                          pageInfo{
                            hasNextPage
                            endCursor
                          }
                        }
                        issueContributions(first: 2) {
                          edges {
                            node {
                              issue {
                                title
                                createdAt
                              }
                            }
                          }
                         
                        }
                      }
                    }
                  }`
              }
              const headersBody = {
                headers : {
                "Content-Type" : "application/json",
                Authorization : `Bearer ${token}`
                }
              }
                res =(!id.startDate || !id.endDate)?await axios.post(`https://api.github.com/graphql`,JSON.stringify(overviewBody),headersBody) : await axios.post(`https://api.github.com/graphql`,JSON.stringify(contributionsBody),headersBody)
              allPullRequests = allPullRequests.concat(res.data.data.user.contributionsCollection.pullRequestContributions.edges);
              endCursor = res.data.data.user.contributionsCollection.pullRequestContributions.pageInfo.endCursor
              hasNextPage = res.data.data.user.contributionsCollection.pullRequestContributions.pageInfo.hasNextPage
            }
              res.data.data.user.contributionsCollection.pullRequestContributions.edges = allPullRequests
              console.log(res.data.data.user)
              return res.data.data.user
            }
            catch(err)
            {
                console.log("Username doesn't exist"+err); 
            }
        } 
    })
})
