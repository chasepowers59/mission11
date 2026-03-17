using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;

namespace WebApplication1.Controllers
{
    /// <summary>
    /// API controller for managing books in the online bookstore.
    /// Provides endpoints for retrieving paginated and sorted book data.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly BookDbContext _context;

        public BooksController(BookDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Gets a paginated list of books with optional sorting.
        /// </summary>
        /// <param name="pageNum">Page number (1-based). Defaults to 1.</param>
        /// <param name="pageSize">Number of books per page. Defaults to 5, max 100.</param>
        /// <param name="sortBy">Sort field: "Title", "Author", or "Price". Defaults to "Title".</param>
        /// <returns>JSON object with books array and totalItems count.</returns>
        [HttpGet]
        public async Task<IActionResult> GetBooks( // QUERY PARAMS: pageNum, pageSize, sortBy, MUST MATCH THE QUERY PARAMS IN THE FRONTEND!!!
            [FromQuery] int pageNum = 1,
            [FromQuery] int pageSize = 5,
            [FromQuery] string sortBy = "Title")
        {
            // Validate pagination parameters, if out of line just use defaults
            if (pageNum < 1) pageNum = 1;
            if (pageSize < 1) pageSize = 5;
            if (pageSize > 100) pageSize = 100;

            var query = _context.Books.AsQueryable();

            // Apply sorting based on sortBy parameter
            query = sortBy.ToLower() switch
            {
                "title" => query.OrderBy(b => b.Title),
                "author" => query.OrderBy(b => b.Author),
                "price" => query.OrderBy(b => b.Price),
                _ => query.OrderBy(b => b.Title)
            };

            // Get total count before pagination
            var totalCount = await query.CountAsync();

            // Apply pagination
            var books = await query
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return Ok(new // use new to return multiple values in a single object, books and totalItems. I am returning Task<IActionResult> response with data
            {
                books = books,
                totalItems = totalCount
            });
        }
    }
}
