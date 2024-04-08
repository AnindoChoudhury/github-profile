import { useRecoilValue } from "recoil";
import Topbar from "../section/Topbar";
import { responseAtomFamily } from "../store/APIResponse";
import { useContext, useEffect, useMemo } from "react";
import UsernameContext from "../context/UsernameContext";
import PNG from "../section/PNG";
export default function RenderStatsPage() {
  const { username } = useContext(UsernameContext);
  const response =
    useRecoilValue(
      responseAtomFamily({
        username: username,
      })
    )  || null
   
    useEffect(()=>{
      window.localStorage.setItem("username",username)
    },[username])

if(response)
{
  // Number of collabs (contains 1 year data)
  const collabs =
    response.contributionsCollection.commitContributionsByRepository.filter(
      (item) => item.repository.owner.login !== username
    ).length;

  // const collabNames = response.contributionsCollection.commitContributionsByRepository.map((item)=>{if(item.repository.owner.login!==username) return item.repository.name}).join(" ");

  // account creation date
  const accountCreationDate = response.createdAt;

  // Number of PRs (contains 1 year data)
  const pullRequests =
    response.contributionsCollection.totalPullRequestContributions;

  // Number of commits (contains 1 year data)
  const commits = response.contributionsCollection.totalCommitContributions;

  // Number of issues (contains 1 year data)
  const issues = response.contributionsCollection.totalIssueContributions;

  const pullRequestArray =
    response.contributionsCollection.pullRequestContributions.edges; // (contains 1 year data)

  // Number of merged pull requests (contains 1 year data)
  let merged, firstMerge;
  if (pullRequestArray.length) {
    const mergedArray = pullRequestArray.filter(
      (item) => item.node?.pullRequest?.merged
    );
    merged = mergedArray.length;
    console.log(mergedArray);
    firstMerge = new Date(
      mergedArray[mergedArray.length - 1].node?.pullRequest?.mergedAt
    ).toLocaleString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } else {
    if (!merged) firstMerge = "Invalid";
  }

  const repoArray = response.repositories.edges;
  // Max Starred Repo
  const maxStarred = repoArray.reduce((acc, item) =>
    acc.node.stargazerCount > item.node.stargazerCount ? acc : item
  );
  const maxStarredRepo = maxStarred.node.name;

  //  Primary language
  const languageMap = new Map();

  // Iterates over the repo array containg object (which contains details about the repo including the primary language)
  for (const item of repoArray) {
    let primaryLanguageName;
    if (item.node.primaryLanguage) {
      // If primary language exists, set primaryLanguageName
      primaryLanguageName = item.node.primaryLanguage.name;
    }

    // If the repo isn't forked & primary language exists, create a key value pair. For example
    // Js => 3, where key is the language and value is the number of Repositories it has been used in
    if (!item.node.isFork && primaryLanguageName) {
      languageMap.set(
        primaryLanguageName,
        languageMap.get(primaryLanguageName) + 1 || 1
      );
    }
  }
  console.log(languageMap);
  // Find out the maximum value, and print its key
  const mostActiveFunction = (map) => {
    let maxKey,
      maxValue = 0;
    for (const item of map.entries()) {
      if (item[1] > maxValue) {
        maxValue = item[1];
        maxKey = item[0];
      }
    }
    return [maxKey, maxValue];
  };
  const [maxUsedLanguage] = mostActiveFunction(languageMap);
  console.log(maxUsedLanguage || "NA");

  // Most productive month

  const weeks = response.contributionsCollection.contributionCalendar.weeks;

  const mostProductiveMonthMap = new Map();
  const mostProductiveDayMap = new Map();
  const mostProductiveDateMap = new Map();
  weeks.forEach((eachWeek) => {
    eachWeek.contributionDays.forEach((day) => {
      if (day.contributionCount) {
        const date = new Date(day.date);
        const month = date.toLocaleString("en-IN", { month: "long" });
        const weekday = date.toLocaleString("en-IN", { weekday: "long" });

        mostProductiveMonthMap.set(
          month,
          mostProductiveMonthMap.get(month) + day.contributionCount ||
            day.contributionCount
        );
        mostProductiveDayMap.set(
          weekday,
          mostProductiveDayMap.get(weekday) + day.contributionCount ||
            day.contributionCount
        );
        mostProductiveDateMap.set(date, day.contributionCount);
      }
    });
  });

  console.log(mostProductiveMonthMap);
  console.log(mostProductiveDayMap);
  console.log(mostProductiveDateMap);

  const [mostProductiveMonth, mostProductiveMonthCount] = mostActiveFunction(
    mostProductiveMonthMap
  );
  const [mostProductiveDay] = mostActiveFunction(mostProductiveDayMap);
  let [mostProductiveDate, mostProductiveDateCount] = mostActiveFunction(
    mostProductiveDateMap
  );

  console.log(mostProductiveMonth, mostProductiveMonthCount);
  console.log(mostProductiveDay);
  console.log(mostProductiveDate, mostProductiveDateCount);

  const author = () => (username === "AnindoChoudury" ? " (author)" : "");

  const generalInformation = useMemo(() => {
    return {
      username: username,
      contributions:
        response.contributionsCollection.contributionCalendar
          .totalContributions,
      contributionsGraph: `https://ghchart.rshah.org/135D66/${username}`,
      imageURL: response.avatarUrl,
      follower: response.followers.totalCount,
      following: response.following.totalCount,
      publicRepos: response.repositories.totalCount,
      createdAt: new Date(accountCreationDate).toLocaleString("en-IN"),
      name: response.name,
      collabs: collabs,
      numberOfPullRequests: pullRequests,
      numberOfCommits: commits,
      numberOfIssues: issues,
      merged: merged || 0,
      firstMerge: firstMerge,
      maxStarred: maxStarredRepo,
      maxUsedLanguage: maxUsedLanguage || "NA",
      mostProductiveMonth: mostProductiveMonth,
      mostProductiveMonthCount: mostProductiveMonthCount,
      mostProductiveDay: mostProductiveDay,
      mostProductiveDateCount: mostProductiveDateCount,
      mostProductiveDate: mostProductiveDate.toLocaleString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    };
  }, [response]);

  
    return (
      <div className="renderStatsPage  flex pb-10 items-center gap-10 flex-col pt-0 overflow-auto">
        <Topbar />
        <PNG generalInformation={generalInformation} />
      </div>
    );
}
  return (
    <div className="h-[100vh]">
      <Topbar/>
      <div className="flex justify-center text-xl h-[80vh] items-center">
          No such username
      </div>
    </div>
  )
}
