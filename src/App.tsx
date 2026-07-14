import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Staff from './pages/Staff/Staff'
import Events from './pages/Events/Events'
import EventDetail from './pages/Events/EventDetail'
import ComingSoon from './pages/ComingSoon/ComingSoon'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/staff" element={<Staff />} />
      <Route path="/contact" element={<ComingSoon title="Contact" />} />
      <Route path="/events" element={<Events />} />
      <Route path="/events/:slug" element={<EventDetail />} />
      <Route path="/patreon" element={<ComingSoon title="Patreon" />} />
      <Route path="/join" element={<ComingSoon title="Join Us" />} />
    </Routes>
  )
}

export default App
