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
                const body = {
                    "query": `query {
                        user(login: "${id}") {
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
                            totalIssueContributions
                            totalPullRequestContributions
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
                        }}`}
              const res = await axios.post(`https://api.github.com/graphql`,JSON.stringify(body), {
               headers:{
                "Content-Type" : "application/json",
                Authorization : `Bearer ${token}`
               } 
              })
              console.log(res.data.data.user);
              return res.data.data.user
            }
            catch(err)
            {
                console.log("Username doesn't exist"+err); 
            }
        } 
    })
})
