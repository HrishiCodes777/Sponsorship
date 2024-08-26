using Microsoft.AspNetCore.Mvc;
using Sponsorship.Models;

namespace Sponsorship.DAO
{
    public interface ISponsorshipDao
    {
        Task<int> AddPayment(Payment payment);
        Task<List<SponsorPaymentDetails>> GetSponsorPaymentDetails();

        Task<List<MatchPaymentDetails>> GetMatchPaymentDetails();

        Task<List<MatchSponsorDetails>> GetMatchSponsorsDetails(string sponsorship_year);
    }
}
