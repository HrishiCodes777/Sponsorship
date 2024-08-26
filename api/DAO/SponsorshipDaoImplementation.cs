using Npgsql;
using NpgsqlTypes;
using Sponsorship.Models;
using System.Data;

namespace Sponsorship.DAO
{
    public class SponsorshipDaoImplementation:ISponsorshipDao
    {
        NpgsqlConnection _connection;

        public SponsorshipDaoImplementation(NpgsqlConnection connection)
        {
            _connection = connection;
        }

        public async Task<int> AddPayment(Payment payment)
        {
            Console.WriteLine($"At implementation: { payment.AmountPaid}");
            int rowsInserted=0;
            string insertQuery = @$"insert into sponsorship.Payments (contract_id,payment_date,amount_paid,payment_status) values ('{payment.ContractId}','{payment.PaymentDate}','{payment.AmountPaid}','{payment.PaymentStatus}')";
            try
            {
                using (_connection)
                {
                    await _connection.OpenAsync();
                    NpgsqlCommand insertCommand = new NpgsqlCommand(insertQuery,_connection);
                    insertCommand.CommandType = CommandType.Text;
                    rowsInserted = await insertCommand.ExecuteNonQueryAsync();
                }
            }
            catch (Exception ex) 
            { 
                Console.WriteLine("Payment not Added",ex.ToString());
            }
            return rowsInserted;
        }

        public async Task<List<SponsorPaymentDetails>> GetSponsorPaymentDetails()
        {
            List<SponsorPaymentDetails> sponsors = new List<SponsorPaymentDetails>();
            string query = @"
                        select
                            s.sponsor_name,
                            s.industry_type,
                            coalesce(sum(p.amount_paid), 0) as total_payments,
                            count(p.payment_id) as number_of_payments,
                            max(p.payment_date) as latest_payment_date
                        from
                            sponsorship.sponsors s
                        left join
                            sponsorship.contracts c on s.sponsor_id = c.sponsor_id
                        left join
                            sponsorship.payments p on c.contract_id = p.contract_id
                        where 
	                        p.payment_status = 'Completed'
                        group by
                            s.sponsor_id,
	                        p.payment_status
                        order by 
	                        s.sponsor_id;";
            try
            {
                using (_connection)
                {
                    await _connection.OpenAsync();
                    NpgsqlCommand command = new NpgsqlCommand(query,_connection);
                    command.CommandType = CommandType.Text;
                    NpgsqlDataReader reader = await command.ExecuteReaderAsync();
                    if (reader.HasRows)
                    {
                        while (reader.Read())
                        {
                            SponsorPaymentDetails spd = new SponsorPaymentDetails();
                            spd.SponsorName = reader.GetString(0);
                            spd.IndustryType = reader.GetString(1);
                            spd.TotalPayment = reader.GetDecimal(2);
                            spd.NoOfPayments = reader.GetInt32(3);
                            spd.PaymentDate = DateOnly.FromDateTime(reader.GetDateTime(4));
                            sponsors.Add(spd);
                        }
                    }
                    reader?.Close();
                }
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
            return sponsors;
        }

        public async Task<List<MatchPaymentDetails>> GetMatchPaymentDetails()
        {
            List<MatchPaymentDetails> matchList = new List<MatchPaymentDetails>();
            string query = @"
                        select 
	                        m.match_name,
	                        m.match_date,
	                        m.match_location,
	                        coalesce(sum(p.amount_paid),0) as total_payment
                        from 
	                        sponsorship.Matches m
                        left join 
	                        sponsorship.contracts c on c.match_id=m.match_id
                        left join 
	                        sponsorship.payments p on p.contract_id=c.contract_id
                        where 
	                        p.payment_status='Completed'
                        group by 
	                        m.match_id
                        order by
	                        m.match_date;";
            try
            {
                using (_connection)
                {
                    await _connection.OpenAsync();
                    NpgsqlCommand command = new NpgsqlCommand(query, _connection);
                    command.CommandType = CommandType.Text;
                    NpgsqlDataReader reader = await command.ExecuteReaderAsync();
                    if (reader.HasRows)
                    {
                        while (reader.Read())
                        {
                            MatchPaymentDetails match = new MatchPaymentDetails();
                            match.MatchName = reader.GetString(0);
                            match.MatchDate = DateOnly.FromDateTime(reader.GetDateTime(1));
                            match.MatchLocation = reader.GetString(2);
                            match.TotalPayment = reader.GetDecimal(3);
                            matchList.Add(match);
                        }
                    }
                    reader?.Close();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
            return matchList;
        }
        public async Task<List<MatchSponsorDetails>> GetMatchSponsorsDetails(string sponsorship_year)
        {
            List<MatchSponsorDetails> matchSponsorsList = new List<MatchSponsorDetails>();
            string query = @$"
                        select 
	                        s.sponsor_name,
                            s.industry_type,
	                        coalesce(count(m.match_id),0) as number_of_matches
                        from 
	                        sponsorship.sponsors s
                        left join
	                        sponsorship.contracts c on c.sponsor_id=s.sponsor_id
                        left join
                            sponsorship.matches m on c.match_id = m.match_id
                        where
	                        extract(year from m.match_date) = {sponsorship_year}
                        group by
	                        s.sponsor_name,
	                        s.industry_type;";

            //NpgsqlParameter param1 = new()
            //{
            //    ParameterName = "@sponsorship_year",
            //    NpgsqlDbType = NpgsqlDbType.Text,
            //    Direction = ParameterDirection.Input,
            //    Value = sponsorship_year
            //};
            try
            {
                using (_connection)
                {
                    await _connection.OpenAsync();
                    NpgsqlCommand command = new NpgsqlCommand(query, _connection);
                    command.CommandType = CommandType.Text;
                    command.Parameters.AddWithValue("@sponsorship_year", sponsorship_year);
                    NpgsqlDataReader reader = await command.ExecuteReaderAsync();
                    if (reader.HasRows)
                    {
                        while (reader.Read())
                        {
                            MatchSponsorDetails matchSponsor = new MatchSponsorDetails();
                            matchSponsor.SponsorName = reader.GetString(0);
                            matchSponsor.SponsorIndustry = reader.GetString(1);
                            matchSponsor.NoOfMatches = reader.GetInt32(2);
                            matchSponsorsList.Add(matchSponsor);
                        }
                    }
                    reader?.Close();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
            return matchSponsorsList;
        }
    }
}
