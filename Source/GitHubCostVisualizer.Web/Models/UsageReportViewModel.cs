using System;
using System.Collections.Generic;


namespace GitHubCostVisualizer.Web.Models
{
    public class UsageReportViewModel
    {
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int TotalActionMinutesUsed { get; set; }
        public List<KeyValuePair<string, int>> ActionsSummary { get; set; }
        public List<KeyValuePair<string, int>> ActionMinutesByRepository { get; set; }
        public decimal AverageDailyStorage { get; set; }
        public List<KeyValuePair<DateTime, decimal>> DailyStorageSummary { get; set; }
        public List<KeyValuePair<string, decimal>> AverageDailyStorageByRepo { get; set; }

    }
}
