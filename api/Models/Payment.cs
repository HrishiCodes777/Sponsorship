namespace Sponsorship.Models
{
    public class Payment
    {
        //public int PaymentId { get; set; }

        public int ContractId { get; set; }

        public string PaymentDate { get; set; }

        public decimal AmountPaid { get; set; }

        public string PaymentStatus { get; set; }
    }
}
