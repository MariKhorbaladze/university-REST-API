import { useState, useEffect } from 'react';
import { Select, Card, Layout, Typography, Space, Alert, Spin } from 'antd';

const { Header, Content } = Layout;
const { Title } = Typography;

const countries = [
  { value: 'Georgia', label: 'საქართველო' },
  { value: 'Ukraine', label: 'უკრაინა' },
  { value: 'Germany', label: 'გერმანია' },
  { value: 'France', label: 'საფრანგეთი' },
  { value: 'United Kingdom', label: 'დიდი ბრიტანეთი' }
];

const Homepage = () => {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [temperature, setTemperature] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=41.69&longitude=44.83&current=temperature_2m'
        );
        const data = await response.json();
        setTemperature(data.current.temperature_2m);
      } catch (err) {
        setError('ვერ მოხერხდა ამინდის მონაცემების მიღება');
      }
    };
    fetchWeather();
  }, []);

  const handleCountryChange = async (value) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://universities.hipolabs.com/search?country=${value}`
      );
      const data = await response.json();
      setUniversities(data);
      setError(null);
    } catch (err) {
      setError('ვერ მოხერხდა უნივერსიტეტების მონაცემების მიღება');
    }
    setLoading(false);
  };

  return (
    <div style={{ 
      display: 'flex',
      justifyContent: 'center',
      padding: '20px',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '800px',
        display: 'flex'
      }}>
        <Layout style={{ 
          background: '#fff',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        }}>
          <Header style={{ 
            background: '#fff', 
            borderBottom: '1px solid #f0f0f0',
            padding: '0 24px'
          }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              height: '100%'
            }}>
              <Title level={3} style={{ margin: 0 }}>უნივერსიტეტების საძიებო სისტემა</Title>
              <Space>
                {temperature !== null ? (
                  <span style={{ fontSize: '20px', color: 'red'}}>{temperature}°C Tbilisi</span>
                ) : (
                  <Spin size="small" />
                )}
              </Space>
            </div>
          </Header>

          <Content style={{ padding: '24px', }}>
            <Select
              style={{ 
                width: '100%',
                marginBottom: '24px' 
              }}
              placeholder="აირჩიეთ ქვეყანა"
              onChange={handleCountryChange}
              options={countries}
            />

            {error && (
              <Alert
                type="error"
                message={error}
                style={{ marginBottom: '16px' }}
              />
            )}

            <Spin spinning={loading}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '16px'
              }}>
                {universities.map((uni, index) => (
                  <Card
                    key={index}
                    title={uni.name}
                    hoverable
                    style={{ height: '100%' }}
                  >
                    <p style={{ marginBottom: '16px' }}>{uni.country}</p>
                    {uni.web_pages?.map((page, i) => (
                      <a
                        key={i}
                        href={page}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: '#1890ff' }}
                      >
                        ვებ-გვერდის ნახვა
                      </a>
                    ))}
                  </Card>
                ))}
              </div>
            </Spin>
          </Content>
        </Layout>
      </div>
    </div>
  );
};

export default Homepage;