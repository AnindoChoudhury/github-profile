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
              // Points to the last item of a page, contains a string
                let pullRequestEndCursor=null; 
             //  returns a boolean value, true if more page exist after the current page, else false, in this app's case, each page contains 10 pull requests OR it fetches 10 pull requests at one hit
                let pullRequestHasNextPage=true; 
                let res; 
              
            //  Concatenates all pull requests into this array, then at the end mutates the original response with this array, so that the original response contains all pull requests. 
                let allPullRequests = []

                let repoEndCursor=null;  
                let repoHasNextPage=true
                let allRepo =[]

              // Wrapped in a while loop, under the condition that next page exists, in Line 70, after : pullRequestEndCursor means that, it will fetch from the pull requests after the endCursor  
                while(pullRequestHasNextPage || repoHasNextPage)
                {
                  const username = id.username; 
                const overviewBody = {
                    query: `query{
                        user(login: "${username}") {
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
                          repositories(first: 100, after: ${repoEndCursor}) {
                            totalCount
                            edges {
                              node {
                                id
                                name
                                isFork
                                isPrivate
                                viewerHasStarred
                                stargazerCount
                                primaryLanguage {
                                  name
                                }
                               
                              }
                            }
                            pageInfo{
                              hasNextPage
                              endCursor
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
                            pullRequestContributions(first: 100, after:"${pullRequestEndCursor}") {
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
                console.log(res.data);
             if(pullRequestHasNextPage)
                  {
                    allPullRequests = allPullRequests.concat(res.data.data.user.contributionsCollection.pullRequestContributions.edges)

                    pullRequestEndCursor = res.data.data.user.contributionsCollection.pullRequestContributions.pageInfo.endCursor

                    pullRequestHasNextPage = res.data.data.user.contributionsCollection.pullRequestContributions.pageInfo.hasNextPage
                  }

              if(repoHasNextPage)
              {
                allRepo = allRepo.concat(res.data.data.user.repositories.edges)

                repoHasNextPage = res.data.data.user.repositories.pageInfo.hasNextPage

              repoEndCursor = `"${res.data.data.user.repositories.pageInfo.endCursor.split("").filter((item)=>(item!=='=')).join("")}"`
              }
            }
              res.data.data.user.contributionsCollection.pullRequestContributions.edges = allPullRequests
              res.data.data.user.repositories.edges = allRepo
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






