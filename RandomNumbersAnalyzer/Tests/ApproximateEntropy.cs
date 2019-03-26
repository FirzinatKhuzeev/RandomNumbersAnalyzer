namespace RandomNumbersAnalyzer.Tests
{
    using System;
    using RandomNumbersAnalyzer.Models;
    using RandomNumbersAnalyzer.Utils;

    /// <summary>
    /// 12: Approximate Entropy Test
    /// </summary>
    /// <remarks>
    /// As with the Serial test of Section 2.11, the focus of this test is the frequency of all possible overlapping
    /// m-bit patterns across the entire sequence. The purpose of the test is to compare the frequency of
    /// overlapping blocks of two consecutive/adjacent lengths (m and m+1) against the expected result for a
    /// random sequence.
    /// </remarks>
    public class ApproximateEntropy : Test
    {
        /// <summary>
        /// Decision Rule (at the 1% Level)
        /// </summary>
        private const double ALPHA = 0.01;

        /// <summary>
        /// The length of the bit string
        /// </summary>
        private int n { get; set; }
        /// <summary>
        /// The length in bits of each block
        /// </summary>
        private int m { get; set; }

        /// <summary>
        /// Constructor of test, supplied with all neccessary values
        /// </summary>
        /// <param name="m">The length in bits of each block</param>
        /// <param name="n">The length of the bit string</param>
        /// <param name="model">Model containing the the binary string</param>
        /// <exception cref="ArgumentException"/>
        public ApproximateEntropy(int m, int n, ref Model model)
            : base(ref model)
        {
            if (n > model.epsilon.Count || n <= 0)
            {
                throw new ArgumentException("The value of n must be smaller than the size of the input data, and be greater than 0", "Frequency n");
            }
            this.m = m;
            this.n = n;
        }

        /// <summary>
        /// Runs the test
        /// </summary>
        /// <param name="printResults">If true text output will be added to a log, otherwise not</param>
        /// <returns>The p_value(s) of the test based upon the input data</returns>
        public override double[] run(bool printResults)
        {

            int r = 0;
            double[] apEn = new double[2];
            for (int blockSize = this.m; blockSize <= this.m + 1; blockSize++)
            {
                if (blockSize == 0)
                {
                    apEn[0] = 0;
                    r++;
                }
                else
                {

                    int[] P = new int[(int)Math.Pow(2, blockSize + 1) - 1];

                    for (int i = 1; i < Math.Pow(2, blockSize + 1) - 1; i++)
                    {
                        P[i] = 0;
                    }
                    //calculate frequency of n overlapping blocks
                    for (int i = 0; i < this.n; i++)
                    {
                        int k = 1;
                        for (int j = 0; j < blockSize; j++)
                        {
                            k *= 2;
                            if ((int)this.model.epsilon[(i + j) % this.n] == 1)
                            {
                                k++;
                            }
                        }
                        P[k - 1]++;
                    }
                    //calculate approximate entropy entry from frequency
                    double sum = 0;
                    int index = (int)Math.Pow(2, blockSize) - 1;
                    for (int i = 0; i < (int)Math.Pow(2, blockSize); i++)
                    {
                        if (P[index] > 0)
                        {
                            sum += P[index] * Math.Log(P[index] / (double)this.n);
                        }
                        index++;
                    }
                    apEn[r] = sum / this.n;
                    r++;
                }
            }
            double approximateEntropy = apEn[0] - apEn[1];

            //calculate p_value
            double chi_squared = 2.0 * this.n * (Math.Log(2) - approximateEntropy);
            double p_value = Cephes.igamc(Math.Pow(2, this.m - 1), chi_squared / 2.0);

            if (printResults)
            {
                Report report = new Report("12: Approximate Entropy Test");
                report.Write("\t\t\tAPPROXIMATE ENTROPY TEST");
                report.Write("\t\t--------------------------------------------");
                report.Write("\t\tCOMPUTATIONAL INFORMATION:");
                report.Write("\t\t--------------------------------------------");
                report.Write("\t\t(a) m (block length)    = " + this.m);
                report.Write("\t\t(b) n (sequence length) = " + this.n);
                report.Write("\t\t(c) Chi^2               = " + chi_squared);
                report.Write("\t\t(d) Phi(m)	          = " + apEn[0]);
                report.Write("\t\t(e) Phi(m+1)	          = " + apEn[1]);
                report.Write("\t\t(f) ApEn                = " + approximateEntropy);
                report.Write("\t\t--------------------------------------------");
                if (this.m > (int)(Math.Log(this.n) / Math.Log(2) - 5))
                {
                    report.Write("\t\tNote: The blockSize = " + this.m + " exceeds recommended value of " +
                        Math.Max(1, (int)(Math.Log(this.n) / Math.Log(2) - 5)));
                    report.Write("\t\tResults are inaccurate!");
                    report.Write("\t\t--------------------------------------------");
                }
                report.Write((p_value < ALPHA ? "FAILURE" : "SUCCESS") + "\t\tp_value = " + p_value);
                this.model.reports.Add(report.title, report);
            }

            return new double[] { p_value };
        }

        /// <summary>
        /// Title of test and key data the object contains
        /// </summary>
        /// <returns>String with title and data</returns>
        public override string ToString()
        {
            return "12: Approximate Entropy Test to run on " + this.n + " bits, and a block length of " + this.m;
        }
    }
}
