export default function ResearchPage() {
  return (
    <article className="research-paper">
      {/* Paper Header */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-black mb-4 leading-tight">
          The Science of Scientific Writing
        </h1>
        
        <p className="text-lg italic text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
          If the reader is to grasp what the writer means,<br />
          the writer must understand what the reader needs
        </p>
        
        <div className="text-base text-black font-medium">
          George D. Gopen and Judith A. Swan
        </div>
      </header>

      {/* Paper Content */}
      <div className="paper-content">
        {/* Two-column layout */}
        <div className="research-columns text-sm leading-relaxed text-black" style={{columnCount: 2, columnGap: '2rem'}}>
          <p className="mb-4">
            <span className="float-left text-5xl font-bold mr-1 mt-1 leading-none">S</span>
            cience is often hard to read. Most people assume that its 
            difficulties are born out of necessity, out of the extreme 
            complexity of scientific concepts, data and analysis. We ar-
            gue here that complexity of thought need not lead to im-
            penetrability of expression; we demonstrate a number of 
            rhetorical principles that can produce clarity in communi-
            cation without oversimplifying scientific issues. The re-
            sults are substantive, not merely cosmetic: Improving the 
            quality of writing actually improves the quality of thought.
          </p>

          <p className="mb-4">
            The fundamental purpose of scientific discourse is not 
            the mere presentation of information and thought, but 
            rather its actual communication. It does not matter how 
            pleased an author might be to have converted all the right 
            data into sentences and paragraphs; it matters only 
            whether a large majority of the reading audience accura-
            ly perceives what the author had in mind. Therefore, in or-
            der to understand how best to improve writing, we would 
            do well to understand better how readers go about read-
            ing. Such an understanding has recently become available 
            through work done in the fields of rhetoric, linguistics and 
            cognitive psychology. It has helped to produce a method-
            ology based on the concept of reader expectations.
          </p>

          <p className="mb-4 font-semibold">
            Writing with the Reader in Mind: Expectation and Context
          </p>

          <p className="mb-4">
            Readers do not simply read; they interpret. Any piece of 
            prose, no matter how short, may &ldquo;mean&rdquo; in 10 (or fewer) 
            different ways to 10 different readers. This methodology of 
            reader expectations is founded on the recognition that 
            readers make many of their most important interpretive 
            decisions about the substance of prose based on clues they 
            receive from its structure.
          </p>

          <p className="mb-4">
            The connection between substance and structure can be 
            demonstrated by something as basic as a simple table. Let 
            us say that in tracking the temperature of a liquid over a 
            period of time, an investigator takes measurements every 
            three minutes and records a list of temperatures. Those 
            data could be presented by a number of written structures. 
            Here are two possibilities:
          </p>

          {/* Data Table */}
          <div className="mb-6 text-xs">
            <div className="grid grid-cols-4 gap-2 mb-2 font-mono">
              <div>t (time) = 15;</div>
              <div>T (temperature) = 32°;</div>
              <div>t = 0;</div>
              <div>T = 25°;</div>
            </div>
            <div className="grid grid-cols-4 gap-2 mb-2 font-mono">
              <div>t = 6, T = 29°;</div>
              <div>t = 3, T = 27°;</div>
              <div>t = 12, T = 32°;</div>
              <div>t = 9, T = 31°</div>
            </div>
            
            <table className="mt-4 text-xs font-mono">
              <thead>
                <tr>
                  <th className="text-left pr-4">time (min)</th>
                  <th className="text-left">temperature (°C)</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="pr-4">0</td><td>25</td></tr>
                <tr><td className="pr-4">3</td><td>27</td></tr>
                <tr><td className="pr-4">6</td><td>29</td></tr>
                <tr><td className="pr-4">9</td><td>31</td></tr>
                <tr><td className="pr-4">12</td><td>32</td></tr>
                <tr><td className="pr-4">15</td><td>32</td></tr>
              </tbody>
            </table>
          </div>

          <p className="mb-4">
            Precisely the same information appears in both formats, 
            yet most readers find the second easier to interpret. It may 
            be that the very familiarity of the tabular structure makes 
            it easier to use. But, more significantly, the structure of the 
            table tells readers exactly how to interpret it: time and 
            context (time) in which the significant piece of information 
            (temperature) can be interpreted. The contextual material 
            appears on the left in a pattern that produces an expecta-
            tion of regularity; the interesting results appear on the 
            right in a less obvious pattern, the discovery of which is 
            the point of the table.
          </p>

          <p className="mb-4">
            If the two sides of this simple table are reversed, it be-
            comes much harder to read.
          </p>

          <table className="mb-6 text-xs font-mono">
            <thead>
              <tr>
                <th className="text-left pr-4">temperature (°C)</th>
                <th className="text-left">time (min)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="pr-4">25</td><td>0</td></tr>
              <tr><td className="pr-4">27</td><td>3</td></tr>
              <tr><td className="pr-4">29</td><td>6</td></tr>
              <tr><td className="pr-4">31</td><td>9</td></tr>
              <tr><td className="pr-4">32</td><td>12</td></tr>
              <tr><td className="pr-4">32</td><td>15</td></tr>
            </tbody>
          </table>

          <p className="mb-4">
            Since we read from left to right, we prefer the context on 
            the left, where it can more effectively familiarize the 
            reader. We prefer the new, important information on the 
            right, since its job is to intrigue the reader.
          </p>

          <p className="mb-4">
            Information is interpreted more easily and more uni-
            formly if it is placed where most readers expect to find it. 
            These needs and expectations of readers affect the inter-
          </p>
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-300 text-xs text-gray-600">
          <p className="mb-2">
            <em>George D. Gopen is associate professor of English and Director of Writing 
            Programs at Duke University. He holds a Ph.D. in English from Harvard 
            University and a J.D. from Harvard Law School. Judith A. Swan teaches sci-
            entific writing at Princeton University. Her Ph.D., which is in biochemistry, 
            was earned at the Massachusetts Institute of Technology. Address for Gopen: 
            307 Allen Building, Duke University, Durham, NC 27706.</em>
          </p>
          
          <div className="text-center mt-6">
            <p className="font-semibold">550 American Scientist, Volume 78</p>
          </div>
          
          <div className="text-center mt-8 text-xs">
            <p>This content downloaded from 62.197.69.79 on Sun, 26 Oct 2014 08:56:15 AM</p>
            <p>All use subject to <span className="text-blue-600 underline">JSTOR Terms and Conditions</span></p>
          </div>
        </footer>
      </div>


    </article>
  );
}
