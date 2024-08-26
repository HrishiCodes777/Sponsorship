namespace Sponsorship.Models
{
    public class SponsorPaymentDetails
    {
        public string SponsorName { get; set; }

        public string IndustryType { get; set; }

        public decimal TotalPayment { get; set; }

        public int NoOfPayments { get; set; }

        public DateOnly PaymentDate { get; set; }
    } 
}
