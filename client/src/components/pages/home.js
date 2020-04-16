import React from 'react';
import Layout from '../core/layout'
import 'antd/dist/antd.css'

const Home  = () => (
          <React.Fragment>
            <Layout >
              <div className='text-center pt-5'>
                 <h1 style={{ color:"#512da8", fontWeight:"lighter", fontFamily:"sans-serif"}}>
                   Basic setup for building any large scale application
                 </h1>
              </div>
            </Layout>
          </React.Fragment>
)

export default Home;
