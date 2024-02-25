export default function About() {
    return (
        <div className="container">
            <h1  className="mb-5 mt-5">About</h1>
            
            <p>The goal is to provide a list of open-source games (only fully open-source - for game remakes that require original game assets check <a href="https://osgameclones.com/">this portal</a>).</p>

            <p >To be included in this list game should be:</p>
            <ol className="list-decimal">
                <li>Fully open-source - i.e. no proprietary assets. Asset license may vary, but those must be free to use.</li>
                <li>Unique in some regard - just another clone of Pong won&lsquo;t do. This naturally doesn&lsquo;t apply to remakes of complex games such as OpenTTD.</li>
                <li>Have some sort of recognition - be featured in a game jam, distributed in a popular linux distro, etc.</li>
            </ol>
        </div>
    );
}