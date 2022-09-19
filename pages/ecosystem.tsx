/* eslint-disable @next/next/no-img-element */
import { faDiscord, faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Filters from 'components/Filters'
import Loader from 'components/Loader'
import React, { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { EcosystemState } from 'store/reducers/ecosystem.slice'
import { RootState } from 'store/store'
import { formatValue } from 'utils/helpers/format'

const tags = ['wallet', 'digital_id', 'defi', 'nft', 'gamefi', 'dao', 'governance', 'bridge', 'infrastructure', 'payments', 'tools', 'starkex', 'mobile', 'green_finance']
const Ecosystem = () => {
  const { loading: fetchingData, projects } = useSelector<RootState, EcosystemState>(state => state.ecosystem)
  const loading = fetchingData || projects.length === 0
  const [selectedTags, setSelectedTags] = useState(tags)
  const [showFilters, toggleFilters] = useState(false)
  const [query, setQuery] = useState('')

  const filteredProjects = useCallback(() => projects.filter(project => project.tags.some(tag => selectedTags.indexOf(tag) > -1) && (project.application.toLowerCase().includes(query.toLowerCase()) || project.description.toLowerCase().includes(query.toLowerCase()) || query.length === 0)), [selectedTags, projects, query])

  const content = (
    <div className="row justify-content-between">
      {
        filteredProjects().map((project, index) => (
          <div className={`col-12 col-md-6 col-lg-4 px-2 ecosystem-card ${index === 0 ? 'mt-0' : index < 3 ? 'mt-3 mt-lg-0' : 'mt-3'}`} key={project.application}>
            <div className="black-gradient rounded-custom">
              <div className="ecosystem-header">
                {
                  project.banner_picture_url && (
                    <img alt="Project Banner" src={project.banner_picture_url} className='ecosystem-image mb-1' />
                  )
                }
                {
                  project.profile_picture_url && (
                    <img src={project.profile_picture_url} alt="Project Logo" className='ecosystem-logo' />
                  )
                }
                <div className="flex flex-row justify-content-center">
                  <h3 className={`text-white text-center ${project.profile_picture_url ? 'mt-5' : 'mt-4'}`}>{project.application}</h3>
                </div>
              </div>
              <div className="row mx-2 mt-4">
                <div className="col-6">
                  <p className="ecosystem-data-title">Followers</p>
                  <p className="ecosystem-data-value">{formatValue(project.countFollowers)}</p>
                </div>
                <div className="col-6">
                  <p className="ecosystem-data-title">On Chain Users</p>
                  <p className="ecosystem-data-value">SOON</p>
                </div>
              </div>
              <div className="row mx-2 mt-3">
                <div className="col">
                  <p className="ecosystem-data-title">Tags</p>
                </div>
              </div>
              <div className="row mx-2 mt-2 ecosystem-pills">
                <div>
                  {
                    project.tags.map((tag) => (
                      <span key={tag} className={`${tag.toLowerCase().replace(' ', '_')}-pill text-center`}>{tag.toUpperCase().replace('_', ' ')}</span>
                    ))
                  }
                </div>
              </div>
              <div className="row mx-2 mt-3">
                <div className="col-8">
                  <div className="ecosystem-splitter" />
                </div>
              </div>
              <div className="row mx-2 mt-3 mb-3">
                <div className="col flex flex-row ecosystem-icons">
                  {
                    project.twitter && (
                      <a href={project.twitter} target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faTwitter} /></a>
                    )
                  }
                  {
                    project.discord && (
                      <a href={project.discord} target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faDiscord} /></a>
                    )
                  }
                  {
                    project.github && (
                      <a href={project.github} target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faGithub} /></a>
                    )
                  }
                  {
                    project.website && (
                      <a href={project.website} target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faGlobe} /></a>
                    )
                  }
                </div>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  )
  return (
    <>
      <div className="d-flex flex-column flex-md-row justify-content-between pb-4">
        <h2 className="ps-0 page-title">Ecosystem</h2>
        <Filters
          tags={tags}
          show={showFilters}
          toggle={toggleFilters}
          selectedTags={selectedTags}
          query={query}
          setQuery={setQuery}
          setSelectedTags={setSelectedTags}
        />
      </div>
      {loading ? (<Loader />) : content}
    </>
  )
}

export default Ecosystem
