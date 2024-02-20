using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;


namespace GitHubCostVisualizer.Web.Models
{
    public class DailyStorageData
    {
        [JsonPropertyName("labels")]
        public List<string> Labels { get; set; }
        [JsonPropertyName("datasets")]
        public List<DailyStorageDataSet> DataSets { get; set; }
    }

    public class DailyStorageDataSet
    {
        [JsonPropertyName("label")]
        public string Label { get; set; }
        [JsonPropertyName("data")]
        public List<decimal> Data { get; set; }
    }


    public class UsageReportViewModel
    {
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int TotalActionMinutesUsed { get; set; }
        public int TotalBillableActionMinutes { get; set; }
        public decimal TotalActionMinutesCost { get; set; }
        public List<KeyValuePair<string, int>> ActionsSummary { get; set; }
        public List<ActionMinutesItem> ActionMinutesByRepository { get; set; }
        public List<ActionMinutesItem> ActionMinutesByWorkflow { get; set; }
        public decimal AverageDailyStorage { get; set; }
        public List<KeyValuePair<DateTime, decimal>> DailyStorageSummary { get; set; }
        public List<KeyValuePair<string, decimal>> AverageDailyStorageByRepo { get; set; }
        public DailyStorageData DailyStorageByRepo { get; set; }
    }

    public class ActionMinutesItem
    {
        public string Label { get; set; }
        public decimal Minutes { get; set; }
        public decimal TotalCost { get; set; }
    }

}
