namespace RandomNumbersAnalyzer.Controllers
{
    using System.Collections.Generic;
    using System.Linq;
    using Microsoft.AspNetCore.Mvc;
    using RandomNumbersAnalyzer.Models;
    using RandomNumbersAnalyzer.Tests;
    using RandomNumbersAnalyzer.Utils;

    [Route("api/[controller]")]
    [ApiController]
    public class AnalyzerController : ControllerBase
    {
        [HttpPost]
        public Dictionary<string, Report> Post([FromBody] Front view)
        {
            List<Test> tests = new List<Test>();
            //Model model = new Model(Util.str2ints(Util.loadData(view.Numbers), view.SplitCharacter));
            Model model = new Model(new List<int>());

            if (view.FrequencyMonobitCheck)
            {
                tests.Add(new Frequency(view.FrequencyMonobit, ref model));
            }
            if (view.FrequencyTestWithinBlockCheck)
            {
                tests.Add(new BlockFrequency(view.FrequencyTestWithinBlockM, view.FrequencyTestWithinBlock, ref model));
            }
            if (view.RunsCheck)
            {
                tests.Add(new Runs(view.Runs, ref model));
            }
            if (view.LongestRunOfOnesInBlockCheck)
            {
                tests.Add(new LongestRunOfOnes(view.LongestRunOfOnesInBlock, ref model));
            }
            if (view.BinaryMatrixRankCheck)
            {
                tests.Add(new Rank(view.BinaryMatrixRank, ref model));
            }
            if (view.DiscreteFourierTransformCheck)
            {
                tests.Add(new DiscreteFourierTransform(view.DiscreteFourierTransform, ref model));
            }
            if (view.NonOverlappingTemplateMatchingCheck)
            {
                if (view.NonOverlappingTemplateMatchingSingle)
                {
                    tests.Add(new NonOverlappingTemplateMatching((int)view.NonOverlappingTemplateMatchingB, view.NonOverlappingTemplateMatching, ref model));
                }
                else
                {
                    tests.Add(new NonOverlappingTemplateMatching((int)view.NonOverlappingTemplateMatchingM, view.NonOverlappingTemplateMatching, ref model));
                }
            }
            if (view.OverlappingTemplateMatchingCheck)
            {
                tests.Add(new OverlappingTemplateMatching(view.OverlappingTemplateMatchingB, view.OverlappingTemplateMatching, ref model));
            }
            if (view.UniversalCheck)
            {
                if (view.UniversalCustom)
                {
                    tests.Add(new Universal((int)view.UniversalL, (int)view.UniversalQ, view.Universal, ref model));
                }
                else
                {
                    tests.Add(new Universal(view.Universal, ref model));
                }
            }
            if (view.LinearComplexityCheck)
            {
                tests.Add(new LinearComplexity((int)view.LinearComplexityM, view.LinearComplexity, ref model));
            }
            if (view.SerialCheck)
            {
                tests.Add(new Serial((int)view.SerialM, view.Serial, ref model));
            }
            if (view.ApproximateEntropyCheck)
            {
                tests.Add(new ApproximateEntropy((int)view.ApproximateEntropyM, view.ApproximateEntropy, ref model));
            }
            if (view.CumulativeSumsCheck)
            {
                tests.Add(new CumulativeSums(view.CumulativeSumsForward, view.CumulativeSums, ref model));
            }
            if (view.RandomExcursionsCheck)
            {
                tests.Add(new RandomExcursions(view.RandomExcursions, ref model));
            }
            if (view.RandomExcursionsVariantCheck)
            {
                tests.Add(new RandomExcursionsVariant(view.RandomExcursionsVariant, ref model));
            }

            Report full = new Report("All Tests");
            foreach (Test t in tests)
            {
                t.run(true);
                full.Write(model.reports.Last().Value.body);
            }
            model.reports.Add(full.title, full);

            return model.reports;
        }
    }
}
