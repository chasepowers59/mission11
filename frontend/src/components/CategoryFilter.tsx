import { useEffect, useState } from 'react';
import { buildApiUrl } from '../api';

type CategoryFilterProps = {
  selectedCategories: string[];
  onCategoryChange: (category: string) => void;
};

function CategoryFilter({
  selectedCategories,
  onCategoryChange,
}: CategoryFilterProps) {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(buildApiUrl('/api/books/GetCategoryTypes'));
        const data = await res.json();

        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="accordion shadow-sm" id="categoryAccordion">
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button
            className="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#categoryAccordionBody"
            aria-expanded="true"
            aria-controls="categoryAccordionBody"
          >
            Filter by Category
          </button>
        </h2>

        <div id="categoryAccordionBody" className="accordion-collapse collapse show">
          <div className="accordion-body">
            <div className="d-grid gap-2">
              <button
                className={`btn ${selectedCategories.length === 0 ? 'btn-dark' : 'btn-outline-dark'}`}
                onClick={() => onCategoryChange('')}
                type="button"
              >
                All Categories
              </button>

              {categories.map((category) => (
                <button
                  key={category}
                  className={`btn ${selectedCategories.includes(category) ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => onCategoryChange(category)}
                  type="button"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryFilter;
