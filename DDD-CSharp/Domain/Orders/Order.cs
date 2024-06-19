using Domain.Customers;
using Domain.Products;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Orders
{
  public class Order
  {
    private readonly HashSet<LineItem> _lineItems = [];
    public Guid Id { get; private set; }
    public Guid CustomerId { get; private set; }
    private Order()
    {

    }
    public static Order Create(Customer customer)
    {
      Order order = new Order()
      {
        Id = Guid.NewGuid(),
        CustomerId = customer.Id
      };

      return order;
    }

    public void Add(Product product)
    {
      LineItem item = new(Guid.NewGuid(), Id, product.Id, product.Price);

      _lineItems.Add(item);
    }
  }

  public class LineItem
  {
    internal LineItem(Guid id, Guid orderId, Guid productId, Money price)
    {
      Id = id;
      OrderId = orderId;
      ProductId = productId;
      Price = price;
    }

    public Guid Id { get; private set; }
    public Guid OrderId { get; private set; }

    public Guid ProductId { get; private set; }

    public Money Price { get; private set; }
  }
}
