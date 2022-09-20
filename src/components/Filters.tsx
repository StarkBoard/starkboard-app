import { faSliders } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

interface Props {
  tags: string[]
  selectedTags: string[]
  show: boolean;
  toggle: (show: boolean) => void
  query: string;
  setQuery: (query: string) => void
  setSelectedTags: (tags: string[]) => void
}

const Filters: React.FC<Props> = ({ tags, selectedTags, setSelectedTags, show, toggle, query, setQuery }) => {
  return (
    <div className="d-flex flex-row ecosystem-filters position-relative justify-content-between">
      {
        show && (
          <div className="position-absolute filters-modal pt-4 pb-2 container">
            <div className="row filters-list pb-3">
              {
                tags.map(tag => (
                  <div className="col-6" key={tag}>
                    <label className="custom-checkbox">
                      <input
                        type="checkbox"
                        className="filters-checkbox" name={tag}
                        checked={selectedTags.includes(tag)}
                        onClick={() => setSelectedTags(selectedTags.includes(tag) ? selectedTags.filter(tempTag => tempTag !== tag) : [...selectedTags, tag])}
                      />
                      <span className="checkmark" />
                      <span>{tag.toUpperCase().replace('_', ' ')}</span>
                    </label>
                  </div>
                ))
              }
            </div>
            <div className="filters-footer d-flex flex-row justify-content-center w-full">
              <button className="cancel-button" onClick={() => toggle(false)}>Close</button>
            </div>
          </div>
        )
      }

      <input type="text" className="text-input px-md-4" placeholder="Search something..." value={query} onChange={(e) => setQuery(e.target.value)} />
      <button className="btn" onClick={() => toggle(!show)}>
        <FontAwesomeIcon icon={faSliders} />
        <span className="d-none d-md-inline">Filters</span>
      </button>
    </div>
  )
}

export default Filters
