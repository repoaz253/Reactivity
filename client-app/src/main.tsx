import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app/layout/App.tsx'
import 'semantic-ui-css/semantic.min.css'
import './app/layout/style.css'
import ActivityStore from './app/stores/activitystores.ts'
import { StoreContext, stores } from './app/stores/stores.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <StoreContext.Provider value = {stores}>
    <App />
    </StoreContext.Provider>
  </StrictMode>,
)
//StoreContext.Provider =-- wrapping the entire component tree 