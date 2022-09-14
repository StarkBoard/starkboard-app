import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { setAll } from 'utils/helpers'
import { RootState } from '../store'
import axios from 'axios'

export interface Project {
  'application': string,
  'application_short': string,
  'countFollowers': number,
  'description': string,
  'discord': string,
  'github': string,
  'isLive': boolean,
  'isTestnetLive': boolean,
  'medium': string,
  'tags': string[],
  'twitter': string,
  'website': string
}

export interface EcosystemState {
  projects: Project[],
  loading: boolean;
}

const initialState: EcosystemState = {
  projects: [],
  loading: false
}

export const fetchEcosystem = createAsyncThunk('ecosystem/fetch', async () => {
  const { data } = await axios.post(process.env.NEXT_PUBLIC_BACKEND_API + '/getCoreApplications',
    {}, {
      headers: { 'x-api-key': process.env.NEXT_PUBLIC_API_KEY || '' }
    })

  return data.result.map((project: Project) => ({ ...project, tags: JSON.parse(project.tags as unknown as string) })) as Project[]
})

const ecosystemSlice = createSlice({
  name: 'ecosystem',
  initialState,
  reducers: {
    fetchEcosystemSuccess (state, action) {
      setAll(state, action.payload)
    }
  },
  extraReducers (builder) {
    builder
      .addCase(fetchEcosystem.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchEcosystem.fulfilled, (state, action) => {
        state.loading = false
        state.projects = action.payload.sort((a, b) => b.countFollowers - a.countFollowers)
      })
      .addCase(fetchEcosystem.rejected, (state, action) => {
        console.log(action.error)
        state.loading = false
      })
  }
})

export const { fetchEcosystemSuccess } = ecosystemSlice.actions

export default ecosystemSlice.reducer

export const getEcosystem = (state: RootState) => state.ecosystem
