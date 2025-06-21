import React from "react";
import 'bootstrap/dist/css/bootstrap.css';

export default function Faq() {
    return (
        <div className="container">
            <h1 className="mb-5 mt-5">FAQ</h1>

            <h2>Which games are included?</h2>
            <p>To be included in this list game should be:</p>
            <ol className="list-decimal">
                <li>Fully open-source - i.e. no proprietary assets. Asset license may vary, but those must be free to use (so for example <a href="https://github.com/id-Software/DOOM">Doom</a> and other famous open-source games are excluded).</li>
                <li>Only games are listed, not game engines (Godot, bevy, etc).</li>
                <li>Game must be in a playable state.</li>
                <li>Source code must be released under any of <a href="https://opensource.org/licenses">OSI approved liceses</a>. Games with no license specified are not featured in the list.</li>
                <li>Unique in some regard - just another clone of Pong won&lsquo;t do. This naturally doesn&lsquo;t apply to remakes of complex games such as OpenTTD.</li>
                <li>Have some sort of recognition - be featured in a game jam, distributed in a popular linux distro, etc.</li>
            </ol>

            <h2>How is the release date determined?</h2>
            <p>Whenever possible the date reflects the first public release of the game. If that information is not available we use one of the following:</p>

            <ul className="list-disc">
                <li>First commit date</li>
                <li>Date of a commit when it&lsquo;s indicated that game is in a playable state</li>
            </ul>

            <h2>How can I contribute?</h2>
            <p>Contributions are welcome! You can submit new games, improvements or corrections via pull-requests. Please read the contribution guidelines in the README first.</p>
        </div>
    );
} 