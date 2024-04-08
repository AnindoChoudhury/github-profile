import { useContext } from "react";
import UsernameContext from "../context/UsernameContext";
export default function PNG({ generalInformation }) {
  const {pngRef}=useContext(UsernameContext)
  return (
    <div ref={pngRef} className="z-80 absolute png p-5 rounded-xl text-white top-[15%] w-[90%] font-semibold text-[0.7rem] font-[Roboto] ">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col">
          <img
            src={generalInformation.contributionsGraph}
            className="relative opacity-[0.7] h-[4rem] md:h-[8rem] md:opacity-[0.5]"
            alt="Name Your Github chart"
          />
          <div className="top-10 flex flex-col gap-2 items-center absolute left-[0.5rem] sm:left-[1rem] md:top-20 md:left-[2rem]">
            <img
              className="md:w-[10rem] w-[5rem] sm:w-[6rem] rounded-full"
              src={generalInformation.imageURL}
              alt=""
            />
            <h1 className="text-[1rem] md:text-2xl font-light">
              {generalInformation.name}
            </h1>
          </div>
        </div>
        <div className="mt-[6rem] md:mt-[10rem]">
          <div className="flex justify-between">
            <div className="flex flex-col">
              <h1 className="font-Roboto font-thin text-3xl text-center">
                {generalInformation.contributions.toLocaleString()}
              </h1>
              <h1 className="font-Roboto font-thin text-center">
                Contributions
              </h1>
            </div>

            <div className="flex flex-col">
              <h1 className="font-Roboto font-thin text-3xl text-center">
                {generalInformation.follower.toLocaleString()}
              </h1>
              <h1 className="font-Roboto font-thin text-center">Followers</h1>
            </div>

            <div className="flex flex-col">
              <h1 className="font-Roboto font-thin text-3xl text-center">
                {generalInformation.following.toLocaleString()}
              </h1>
              <h1 className="font-Roboto font-thin text-center">Following</h1>
            </div>

            <div className="flex flex-col">
              <h1 className="font-Roboto font-thin text-3xl text-center">
                {generalInformation.publicRepos.toLocaleString()}
              </h1>
              <h1 className="font-Roboto font-thin text-center">Repos</h1>
            </div>
          </div>
          <div className="mt-[2rem] md:mt-[4rem]">
            <h1 className="font-Roboto font-thin text-[1.2rem] text-center">
              LAST YEAR'S DATA
            </h1>
            <div className="mt-4 grid gap-y-[2rem] grid-cols-2 text-center font-Roboto font-[350] md:grid-cols-5">
              <div className="flex flex-col">
                <h1 className="font-Roboto font-thin text-2xl text-center">
                  {generalInformation.collabs}
                </h1>
                <h1 className="font-Roboto font-thin text-center">Collabs</h1>
              </div>
              <div className="flex flex-col">
                <h1 className="font-Roboto font-thin text-2xl text-center">
                  {generalInformation.numberOfCommits}
                </h1>
                <h1 className="font-Roboto font-thin text-center">Commits</h1>
              </div>
              <div className="flex flex-col">
                <h1 className="font-Roboto font-thin text-2xl text-center">
                  {generalInformation.numberOfIssues}
                </h1>
                <h1 className="font-Roboto font-thin text-center">Issues</h1>
              </div>
              <div className="flex flex-col">
                <h1 className="font-Roboto font-thin text-2xl text-center">
                  {generalInformation.merged}
                </h1>
                <h1 className="font-Roboto font-thin text-center">
                  Merged Pull Requests
                </h1>
              </div>
              <div className="flex flex-col">
                <h1 className="font-Roboto font-thin text-[1.2rem] text-center">
                  {generalInformation.firstMerge}
                </h1>
                <h1 className="font-Roboto font-thin text-center">
                  First Merge
                </h1>
              </div>
              <div className="flex flex-col">
                <h1 className="font-Roboto break-words font-thin text-[1.2rem] text-center">
                  {generalInformation.maxStarred}
                </h1>
                <h1 className="font-Roboto font-thin text-center">
                  Max Starred
                </h1>
              </div>
              <div className="flex flex-col">
                <h1 className="font-Roboto font-thin text-[1.2rem] text-center">
                  {generalInformation.maxUsedLanguage}
                </h1>
                <h1 className="font-Roboto font-thin text-center">
                  Max Used Language
                </h1>
              </div>
              <div className="flex flex-col">
                <h1 className="font-Roboto font-thin text-[1.2rem] text-center">
                  {generalInformation.mostProductiveMonth}
                </h1>
                <h1 className="font-Roboto font-thin text-center">
                  Most Productive Month
                </h1>
              </div>
              <div className="flex flex-col">
                <h1 className="font-Roboto font-thin text-[1.2rem] text-center">
                  {generalInformation.mostProductiveDay}
                </h1>
                <h1 className="font-Roboto font-thin text-center">
                  Most Productive Day
                </h1>
              </div>
              <div className="flex flex-col">
                <h1 className="font-Roboto font-thin text-[1.2rem] text-center">
                  {generalInformation.mostProductiveDate}
                </h1>
                <h1 className="font-Roboto font-thin text-center">
                  Most Productive Date
                </h1>
              </div>
            </div>
            <div className="mt-[3rem] font-Roboto font-thin text-[1rem]">
              <h1>
                Your Productivity peaked in{" "}
                {generalInformation.mostProductiveMonth} with{" "}
                {generalInformation.mostProductiveMonthCount} contributions!
              </h1>
              <h1 className="mt-2">
                You maxed out on {generalInformation.mostProductiveDate} with{" "}
                {generalInformation.mostProductiveDateCount} contributions in a
                single day!
              </h1>
              <h1 className="mt-[4rem] text-center">
                Pushing code since {generalInformation.createdAt}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
