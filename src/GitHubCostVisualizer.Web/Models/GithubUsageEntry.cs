﻿using System;
using CsvHelper.Configuration.Attributes;

namespace GitHubCostVisualizer.Web.Models
{
    public class GithubUsageEntry
    {
        [Name("Date")]
        public DateTime Date { get; set; }
        [Name("Product")]
        public string Product { get; set; }
        [Name("Repository Slug")]
        public string Repository { get; set; }
        [Name("SKU")]
        public string Sku { get; set; }
        [Name("Quantity")]
        public decimal? Quantity { get; set; }
        [Name("Unit Type")]
        public string UnitType { get; set; }
        [Name("Price Per Unit ($)")]
        public decimal? PricePer { get; set; }
        [Name("Multiplier")]
        public decimal? Multiplier { get; set; }
        [Name("Actions Workflow")]
        public string ActionWorkflow { get; set; }
        [Name("Username")]
        public string Username { get; set; }
        [Name("Notes")]
        public string Notes { get; set; }
        public string TrimmedWorkflow => ActionWorkflow?.Replace(".github/workflows/", "");
    }
}