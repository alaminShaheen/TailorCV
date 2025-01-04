import React from "react";
import AddResume from "@/components/AddResume";
import ResumeList from "@/components/ResumeList";

const Resumes = () => {
    console.log(process.env.API_SERVICE_BASE_URL, "hello");
    return (
        <div className="w-full">
            <div className="w-full mx-auto max-w-7xl py-5 px-5">
                <div className="flex items-start justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Resume Builder</h1>
                        <p className="text-base dark:text-inherit">
                            Create your own custom resumes with AI
                        </p>
                    </div>
                </div>

                <div className="w-full pt-11">
                    <h5 className="text-xl font-semibold dark:text-inherit mb-3">
                        All Resumes
                    </h5>
                    <div className="flex flex-wrap w-full gap-5">
                        <AddResume />
                        <ResumeList />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Resumes;
