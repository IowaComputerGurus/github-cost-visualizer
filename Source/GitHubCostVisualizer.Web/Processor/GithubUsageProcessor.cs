using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Transactions;
using GitHubCostVisualizer.Web.Models;

namespace GitHubCostVisualizer.Web.Processor
{
    public interface IGithubUsageProcessor
    {
        UsageReportViewModel ProcessUsageReport(List<GithubUsageEntry> entries);
    }

    public class GithubUsageProcessor : IGithubUsageProcessor
    {
        public UsageReportViewModel ProcessUsageReport(List<GithubUsageEntry> entries)
        {
            var model = new UsageReportViewModel();
            model.StartDate = entries.Min(i => i.Date);
            model.EndDate = entries.Max(i => i.Date);
            model.TotalActionMinutesUsed =
                entries.Where(i => i.Product == "actions").Sum(i => (int)i.Quantity);
            model.ActionsSummary = (from x in entries.Where(i => i.Product == "actions")
                                    group x by x.UnitType
                    into grp
                                    select new KeyValuePair<string, int>(grp.Key, grp.Sum(i => (int)i.Quantity)))
                .ToList();
            model.ActionMinutesByRepository = (from x in entries.Where(i => i.Product == Constants.GitHubProducts.Actions)
                                               group x by x.Repository
            into grp
                                               select new KeyValuePair<string, int>(grp.Key, grp.Sum(i => (int)i.Quantity))).ToList();

            model.DailyStorageSummary = (from x in entries.Where(i => i.Product == "shared storage")
                                         group x by x.Date
                    into grp
                                         select new KeyValuePair<DateTime, decimal>(grp.Key, grp.Sum(i => i.Quantity)))
                .ToList();
            if (model.DailyStorageSummary.Count > 0)
            {
                model.AverageDailyStorage =
                    model.DailyStorageSummary.Sum(i => i.Value) / model.DailyStorageSummary.Count;

                var totalDays = model.DailyStorageSummary.Count();
                model.AverageDailyStorageByRepo = (from x in entries.Where(i => i.Product == Constants.GitHubProducts.SharedStorage)
                    group x by x.Repository
                    into grp
                    select new KeyValuePair<string, decimal>(grp.Key, grp.Sum(i => i.Quantity) / grp.Count())).ToList();
            }

            return model;
        }
    }
}
