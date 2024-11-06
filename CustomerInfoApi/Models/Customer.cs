using System.ComponentModel.DataAnnotations;

namespace CustomerInfo.Models
{
    public class Customer
    {
        public long Id { get; set; }
        [Required]
        public string Name { get; set; }
        public Address? Address { get; set; }
    }
}
