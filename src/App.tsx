import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import DataTable from './components/DataTable';

export interface Company {
  name: string;
  headquarters_address: string;
  headquarters_city_state: string;
  description: string;
  industry: string;
  company_url: string;
  linkedin_url: string;
  logo: string;
  latest_funding: string;
  latest_funding_round: string;
  size: number;
  li_size: string;
  age_founded: number;
  glass_door: number;
  ceo_approvals: number;
  recommended: number;
}

function App() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const lambdaEndpoint = 'https://npqppkopd7.execute-api.us-east-1.amazonaws.com/default/jobBoard';
        const response = await axios.get(lambdaEndpoint);
        setCompanies(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data: ', error);
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  return (
<div className="App min-w-screen min-h-screen bg-gray-900 text-white">
  <header className="App-header p-4 text-center top-0 left-0 right-0 z-10 bg-gray-900">
    <h1 className="text-3xl font-bold">SundayScoop</h1>
    <h1 className="text-xl font-bold text-blue-500">Startup Database</h1>
  </header>
  <div className="min-w-screen min-h-screen pt-16 p-4">
    {loading ? <p>Loading...</p> : <DataTable companies={companies} />}
  </div>
</div>
  );
}

export default App;