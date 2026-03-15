using Microsoft.EntityFrameworkCore;

namespace WebApplication1.Data
{
    /// <summary>
    /// Entity Framework DbContext for the bookstore database.
    /// Manages the connection to the SQLite Bookstore.sqlite database.
    /// </summary>
    public class BookDbContext : DbContext
    {
        public BookDbContext(DbContextOptions<BookDbContext> options) : base(options)
        {
        }

        /// <summary>
        /// DbSet for Book entities from the database.
        /// </summary>
        public DbSet<Book> Books { get; set; }
    }
}
