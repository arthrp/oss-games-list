export default function About() {
    return (
        <div className="container">
            <h1  className="mt-5">About</h1>
            
            <p>The goal is to provide a list of open-source games (only original games for now - for OSS games remakes check <a href="https://osgameclones.com/">this portal</a>).</p>

            <p >To be included in this list game should be:</p>
            <ol className="list-decimal">
                <li>Fully open-source - i.e. no proprietary assets. Asset license may vary, but those must be free to use.</li>
                <li>Unique in some regard - just another clone of Pong won&lsquo;t do.</li>
            </ol>
        </div>
    );
}