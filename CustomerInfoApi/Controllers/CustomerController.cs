using CustomerInfo.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CustomerInfo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly CustomerContext _customerContext;
        private readonly ILogger _logger;
        public CustomerController(CustomerContext customerContext, ILogger<CustomerController> logger)
        {
            _customerContext = customerContext;
            _logger = logger;
        }

        [HttpPost]
        public async Task<ActionResult<Customer>> PostCustomer(Customer customer)
        {
            _logger.LogInformation("Received request to save customer");
            _customerContext.Customers.Add(customer);
            await _customerContext.SaveChangesAsync();
            _logger.LogInformation("Customer saved successfully with id: {id}", customer.Id);
            return CreatedAtAction(nameof(GetCustomer), new { id = customer.Id }, customer);
        }

        [HttpGet("{id}")]
        public ActionResult<Customer> GetCustomer(long id)
        {
            _logger.LogInformation("Getting customer with id: {id}", id);
            var customer = _customerContext.Customers
                                .Where(cust => cust.Id == id)
                                .Include(cust => cust.Address)
                                .FirstOrDefault();

            if (customer == null) {
                _logger.LogError("Customer with id: {id} not found", id);
                return NotFound(); 
            }

            _logger.LogInformation("Returning customer info");
            return customer;
        }
    }
}
