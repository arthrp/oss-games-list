import React from "react";
import 'bootstrap/dist/css/bootstrap.css'; 

export default function About() {
    return (
        <div className="container">
            <h1 className="mb-5 mt-5">About</h1>
            
            <p>The goal is to provide a list of open-source games (only fully open-source - for game remakes that require original game assets check <a href="https://osgameclones.com/">this portal</a>).</p>

            <p>Other projects dedicated to open-source games:</p>
            <ul className="list-disc">
                <li><a href="https://libregamewiki.org/Main_Page">LibreGameWiki</a></li>
                <li><a href="https://github.com/michelpereira/awesome-open-source-games">Collection of OSS games on Github</a></li>
            </ul>
        </div>
    );
}