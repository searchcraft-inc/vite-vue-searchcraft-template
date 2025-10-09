import type { SearchResultTemplate } from "@searchcraft/vue-sdk";

/**
 * This type represents your index schema.
 *
 * Updated to match the actual search result structure.
 */
type ExampleSearchResultTemplateIndexSchema = {
	enclosure_url: string;
	category: string[];
	title: string;
	dc_creator: string;
	content_encoded: string;
	dcterms_modified: string;
	pub_date: string;
	description: string;
	id: string;
	link: string;
};

/**
 * The templating function used to render a search result item.
 *
 * Documentation: https://docs.searchcraft.io/sdks/javascript/working-with-templates/
 */
export const exampleSearchResultTemplate: SearchResultTemplate<
	ExampleSearchResultTemplateIndexSchema
> = (data, index, { html }) => {
  // Helper function to get the primary category
  const getPrimaryCategory = (categories: string[]) => {
    return categories && categories.length > 0 ? categories[0] : 'Article';
  };

  // Helper function to truncate content
  const truncateContent = (content: string, maxLength = 200) => {
    if (!content) return '';
    return content.length > maxLength ? `${content.substring(0, maxLength)}...` : content;
  };

  return html`
    <a href="${data.link}" target="_blank" rel="noreferrer">
      <div class="search-result-content">
        <h3 class="search-result-content-subtitle">${getPrimaryCategory(data.category)}</h3>
        <h2 class="search-result-content-title">${data.title}</h2>
        <p class="search-result-content-body">${data.description || truncateContent(data.content_encoded)}</p>
        <footer class="search-result-content-footer">
          <time>
            ${new Intl.DateTimeFormat("en-US", {
							day: "numeric",
							month: "short",
							year: "numeric",
						}).format(new Date(data.pub_date))}
          </time>
          •
          <p>${data.dc_creator}</p>
        </footer>
      </div>
      <div class="search-result-image">
        <img src="${data.enclosure_url}" alt="${data.title}" />
      </div>
    </a>
  `;
};
