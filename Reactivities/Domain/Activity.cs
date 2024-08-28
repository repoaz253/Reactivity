using System.Reflection;

namespace Domain
{
    public class Activity
    {
        public Guid Id { get; set; }
        public string Title {get; set;}
        public DateTime Date  { get; set; }

        public string Description { get; set; }

        public string Category { get; set; }

        public string City {get; set;}

        public string Venue { get; set; }

    }
}


//A domain entity in a project refers to a core object or model that represents a significant concept or business entity within the domain (or problem space) that your application is intended to address

//For example, in an e-commerce application, domain entities might include Product, Order, Customer, and Invoice.