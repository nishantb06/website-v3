'use client';

import { useState } from 'react';

export default function ResearchPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 2;

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

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
          {currentPage === 1 && (
            <>
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
            </>
          )}

          {currentPage === 2 && (
            <>
              <p className="mb-4">
                pretation not only of tables and illustrations but also of 
                prose itself. Readers have relatively fixed expectations 
                about where in the structure of prose they will encounter 
                particular items of information. If writers can become con-
                sciously aware of these locations, they can better control 
                the degrees of recognition and emphasis a reader will give 
                to the various pieces of information being presented. Good 
                writers are intuitively aware of these expectations; that is 
                why their prose has what we call &ldquo;shape.&rdquo;
              </p>

              <p className="mb-4">
                This underlying concept of reader expectation is per-
                haps most immediately evident at the level of the largest 
                units of discourse. (A unit of discourse is defined as any-
                thing with a beginning and an end: a clause, a sentence, a 
                section, an article, etc.) A research article, for example, is 
                generally divided into recognizable sections, sometimes 
                labeled Introduction, Experimental Methods, Results and 
                Discussion. When the sections are confused—when too 
                much experimental detail is found in the Results section, 
                or when discussion and results intermingle—readers are 
                often equally confused. In smaller units where the 
                functional divisions are not so explicitly labeled, but read-
                ers have definite expectations all the same, the 
                search for certain information in particular places. If these 
                structural expectations are continually violated, readers 
                are forced to divert energy from understanding the con-
                tent of a passage to unraveling its structural puzzles. As the com-
                plexity of the content increases moderately, the possibili-
                ty of misinterpretation or noninterpretation increases 
                dramatically.
              </p>

              <p className="mb-4">
                We present here some results of applying this methodol-
                ogy to research reports in the scientific literature. We have 
                taken several passages from research reports (either pub-
                lished or accepted for publication) and have suggested 
                ways of revising them by applying the principles derived 
                from the study of reader expectations. We have not sought 
                to invention this passage into &ldquo;plain English&rdquo; for the eyes 
                of the general public; we have neither decreased the jargon 
                nor diluted the science. We have sought only clarifica-
                tion but for clarification.
              </p>

              <p className="mb-4 font-semibold">
                Reader Expectations for the Structure of Prose
              </p>

              <p className="mb-4">
                Here is our first example of scientific prose, in its original 
                form:
              </p>

              <p className="mb-4">
                The smallest of the URF&apos;s (URFA6L), a 207-nucleotide 
                (nt) reading frame overlapping out of phase with the NH2-
                terminal portion of the adenosinetriphosphatase 
                (ATPase) subunit 6 gene, has been identified as the 
                animal equivalent of the recently discovered yeast H+-
                ATPase subunit 8. The functional significance of 
                the other URF&apos;s has been, on the contrary, elusive. 
                Recently, however, immunoprecipitation experiments 
                with antibodies to purified, rotenone-sensitive NADH-
                ubiquinone oxidoreductase [respiratory chain NADH-
                dehydrogenase or complex I] from bovine heart, as well as enzyme studies, have indicated that six human URF&apos;s (that is, 
                URF1, URF2, URF3, URF4, URF4L, and URF5, hereafter 
                referred to as ND1, ND2, ND3, ND4, ND4L, and ND5) 
                encode subunits of complex I. The large complex 
                that also contains many subunits synthesized in the 
                cytoplasm.
              </p>

              <p className="mb-4">
                Ask any ten people why this paragraph is hard to read, 
                and nine are sure to mention the technical vocabulary; sev-
              </p>

              {/* Highlighted quote box */}
              <div className="quote-box my-8 p-6 border-l-4 border-gray-400 bg-gray-50 italic text-base leading-relaxed">
                <p className="text-lg font-semibold mb-2">
                  Information is interpreted more easily and more uniformly if it is 
                  placed where most readers expect to 
                  find it.
                </p>
              </div>

              <p className="mb-4">
                eral will also suggest that it requires specialized back-
                ground knowledge. Those problems turn out to be only a 
                small part of the difficulty. Here is the passage again, with 
                the difficult words temporarily lifted:
              </p>

              <p className="mb-4">
                The smallest of the URF&apos;s, a ___-nucleotide 
                as a __________ gene. The functional significance of 
                the other URF&apos;s has been, on the contrary, elusive. Recently, 
                however, _________ experiments, as well as __ studies, have 
                indicated that six human URF&apos;s [...] encode subunits of 
                Complex I. This is a large complex that also contains 
                many subunits synthesized in the cytoplasm.
              </p>

              <p className="mb-4">
                It may now be easier to survive the journey through the 
                prose, but the passage is still difficult. Any number of 
                questions present themselves: What has the first sentence 
                of the passage got to do with the last sentence? Does the third 
                sentence contradict what we have been told in the second
              </p>

              <p className="mb-4">
                sentence? Is the functional significance of URF&apos;s still &ldquo;elu-
                sive&rdquo;? Will this passage lead us to further discussion about 
                URF&apos;s, or about Complex I, or both?
              </p>

              <p className="mb-4">
                Knowing a little about the subject matter does not clear 
                up all the confusion. The intended audience of this pas-
                sage would probably possess at least two items of essential 
                technical information first, &ldquo;URF&rdquo; stands for &ldquo;Uninter-
                rupted Reading Frame,&rdquo; which describes a segment of 
                DNA organized in such a way that it could encode a pro-
                tein, although no such protein product has yet been iden-
                tified. Second, both the gene and NADH oxido-reductase 
                enzyme complexes central to energy metabolism. Al-
                though this information may provide some sense of com-
                fort, it does little to answer the interpretive questions that 
                need answering. It seems the reader is hindered by more 
                than just the scientific jargon.
              </p>

              <p className="mb-4">
                To get at the problem, we need to articulate something 
                about how readers go about reading. We proceed to the 
                first of several reader expectations.
              </p>

              <p className="mb-4 font-semibold">
                Subject-Verb Separation
              </p>

              <p className="mb-4">
                Look again at the first sentence of the passage cited above. 
                It is 85 words long. 42 words that turn out not to be 
                the main cause of its burdensome complexity. Long sen-
                tences need not be difficult to read; they are only difficult to 
                write. We have seen sentences of over 100 words that flow 
              </p>

              <p className="mb-4">
                &ldquo;The full paragraph includes one more sentence: &ldquo;Support for 
                such functional identification of the URF products has come 
                recently from experiments in which the URF region 
                dehydrogenase from Neurospora crassa contains several sub-
                units synthesized within the mitochondria, and from the obser-
                vation that the stopper mutant of Neurospora crassa, whose 
                mtDNA lacks two genes homologous to URF2 and URF3, has 
                a defective in [sic] complex I [functional]. We have omitted this sentence both 
                because the passage is long enough as is and because it raises 
                no additional structural problems.&rdquo;
              </p>
            </>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-12 pt-6 border-t border-gray-300">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className={`px-6 py-2 text-sm font-medium border rounded-md transition-colors ${
              currentPage === 1
                ? 'border-gray-300 text-gray-400 cursor-not-allowed'
                : 'border-gray-600 text-gray-700 hover:bg-gray-50 hover:border-gray-800'
            }`}
          >
            ← Previous Page
          </button>

          <div className="text-sm text-gray-600 font-medium">
            Page {currentPage} of {totalPages}
          </div>

          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className={`px-6 py-2 text-sm font-medium border rounded-md transition-colors ${
              currentPage === totalPages
                ? 'border-gray-300 text-gray-400 cursor-not-allowed'
                : 'border-gray-600 text-gray-700 hover:bg-gray-50 hover:border-gray-800'
            }`}
          >
            Next Page →
          </button>
        </div>

        {/* Footer */}
        <footer className="mt-8 pt-8 border-t border-gray-300 text-xs text-gray-600">
          <p className="mb-2">
            <em>George D. Gopen is associate professor of English and Director of Writing 
            Programs at Duke University. He holds a Ph.D. in English from Harvard 
            University and a J.D. from Harvard Law School. Judith A. Swan teaches sci-
            entific writing at Princeton University. Her Ph.D., which is in biochemistry, 
            was earned at the Massachusetts Institute of Technology. Address for Gopen: 
            307 Allen Building, Duke University, Durham, NC 27706.</em>
          </p>
          
          <div className="text-center mt-6">
            <p className="font-semibold">{currentPage === 1 ? '550' : '551'} American Scientist, Volume 78</p>
          </div>
          
          <div className="text-center mt-6">
            <p className="font-semibold text-sm">1990 November-December {currentPage === 1 ? '550' : '551'}</p>
          </div>
          
          <div className="text-center mt-4 text-xs">
            <p>This content downloaded from 62.197.69.79 on Sun, 26 Oct 2014 08:56:15 AM</p>
            <p>All use subject to <span className="text-blue-600 underline">JSTOR Terms and Conditions</span></p>
          </div>
        </footer>
      </div>


    </article>
  );
}
