namespace Sponsorship.Models
{
    public class MatchPaymentDetails
    {
        public string MatchName { get; set; }
        public DateOnly MatchDate { get; set; }
        public string MatchLocation { get; set; }
        public decimal TotalPayment { get; set; }

    }
}
