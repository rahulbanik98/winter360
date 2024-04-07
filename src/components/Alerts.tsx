import React, { useState } from "react"

export default function Alerts() {
    const [dismiss, setDismiss] = useState(false)

    return (
        <>
            {/*<!-- Component: Dismissible Success Alert --> */}
            <div
                className={`${dismiss && "hidden"
                    } flex w-full items-center gap-4 rounded border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-500`}
                role="alert"
            >
                {/*  <!-- Text --> */}
                <p className="flex-1">Success! You have installed Tailwind CSS</p>
                {/*  <!-- Close button --> */}
                <button
                    aria-label="Close"
                    className="inline-flex h-8 items-center justify-center gap-2 justify-self-center whitespace-nowrap rounded-full px-4 text-xs font-medium tracking-wide text-emerald-500 transition duration-300 hover:bg-emerald-100 hover:text-emerald-600 focus:bg-emerald-200 focus:text-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:text-emerald-300 disabled:shadow-none disabled:hover:bg-transparent"
                    onClick={() => setDismiss(true)}
                >
                    <span className="relative only:-mx-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            role="graphics-symbol"
                            aria-labelledby="title-11 desc-11"
                        >
                            <title id="title-11">Icon title</title>
                            <desc id="desc-11">A more detailed description of the icon</desc>
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </span>
                </button>
            </div>
            {/*<!-- End Dismissible Success Alert --> */}
        </>
    )
}
