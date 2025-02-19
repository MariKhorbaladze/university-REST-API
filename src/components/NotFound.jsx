import { useNavigate } from 'react-router-dom';
import { Layout, Button, Result } from 'antd';
import { HomeOutlined, ArrowLeftOutlined } from '@ant-design/icons';

const { Content } = Layout;

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Content
        style={{
          padding: 24,
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: '#f5f5f5'
        }}
      >
        <Result
          status="404"
          title="404"
          subTitle="გვერდი ვერ მოიძებნა"
          extra={[
            <Button 
              type="primary" 
              icon={<HomeOutlined />}
              onClick={() => navigate('/')}
              key="home"
              size="large"
            >
              მთავარ გვერდზე დაბრუნება
            </Button>,
            <Button
              icon={<ArrowLeftOutlined />}
              onClick={() => navigate(-1)}
              key="back"
              size="large"
            >
              წინა გვერდზე დაბრუნება
            </Button>
          ]}
        />
      </Content>
    </Layout>
  );
};

export default NotFound;