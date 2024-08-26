using Microsoft.AspNetCore.Mvc;
using Sponsorship.DAO;
using Sponsorship.Models;


namespace Sponsorship.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SponsorshipController:ControllerBase
    {
        private readonly ISponsorshipDao _sponsorshipDao;
        public SponsorshipController(ISponsorshipDao sponsorshipDao)
        {
            _sponsorshipDao = sponsorshipDao;
        }

        [HttpPost("add-payment",Name = "AddPayment")]
        public async Task<ActionResult<Payment>> AddPayment(Payment payment)
        {
            Console.WriteLine($"At Controller: {payment.AmountPaid}");
            int value = 0;
            //if (payment.PaymentDate != null) { }
            if (payment == null) 
            {
                return BadRequest("Empty Request");
            }
            value = await _sponsorshipDao.AddPayment(payment);
            return Ok(value);
        }

        [HttpGet("sponsors/payments-info")]
        public async Task<ActionResult<List<SponsorPaymentDetails>>> GetSponsorPaymentDetails()
        {
            var sponsors = await _sponsorshipDao.GetSponsorPaymentDetails();
            if (sponsors == null) 
            {
                return BadRequest("No Sponsors Found");
            }
            return Ok(sponsors);
        }

        [HttpGet("matches/payments-info")]
        public async Task<ActionResult<List<SponsorPaymentDetails>>> GetMatchPaymentDetails()
        {
            var sponsors = await _sponsorshipDao.GetMatchPaymentDetails();
            if (sponsors == null)
            {
                return BadRequest("No Matches Found");
            }
            return Ok(sponsors);
        }

        [HttpGet("matches/sponsors-info")]
        public async Task<ActionResult<List<SponsorPaymentDetails>>> GetMatchSponsorsDetails(string sponsorship_year)
        {
            var sponsors = await _sponsorshipDao.GetMatchSponsorsDetails(sponsorship_year);
            if (sponsors == null)
            {
                return BadRequest("No Matches Found");
            }
            return Ok(sponsors);
        }
    }
}
