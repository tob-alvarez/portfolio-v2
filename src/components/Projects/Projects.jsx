/* eslint-disable react/no-unescaped-entities */
import './Projects.css'
import Paper from '@mui/material/Paper';
import GitHubIcon from '@mui/icons-material/GitHub';
import AppleIcon from '@mui/icons-material/Apple';
import comPic from '../../assets/comScreen.png'
import equipaPic from '../../assets/equipa.png'
import ciditucPic from '../../assets/cidituc.png'
import todopic from '../../assets/todopic.png'
import LockIcon from '@mui/icons-material/Lock';
import { useContext } from 'react';
import { TobContext } from '../../context/TobContext';
import react from '../../assets/react2.svg'
import android from '../../assets/android-icon.svg'
import ex2 from '../../assets/Express.js_light.svg'
import ex from '../../assets/Express.js_dark.svg'
import mongo from '../../assets/mongodb.svg'
import expo from '../../assets/expo.svg'
import mysql from '../../assets/mysql2.svg'
import material from '../../assets/materialui.svg'

const Projects = () => {

    const { darkMode } = useContext(TobContext);
    const textColor = darkMode ? "text-dark" : "text-white";

    const irAlGithub = () =>{
        window.open("https://github.com/tob-alvarez/TodoList-Native", "_blank");
    }

    return (
    <section className='projectsSection py-5 container'>
        <h2 className={`seccion ${textColor}`} id='projects'>Projects</h2>
        <div className='d-flex mt-5 w-100 justify-content-around flex-wrap'>
            <Paper elevation={8} className={darkMode ? 'project d-flex flex-column justify-content-around p-3' : 'projectTransparent d-flex flex-column justify-content-around p-3'}>
                <img className='img-fluid rounded-2' src={ciditucPic} alt="" />
                <h3 className={`m-2 titulo-project ${textColor}`}>CidiTuc</h3>
                <p className={`description p-2 m-0a ${textColor}`}>CidiTuc is a huge application that was developed for the municipality of San Miguel de Tucuman, it has functions for the public use of citizens and also for the company's employees and its officials.</p>
                <div className='mx-2 my-4 d-flex gap-2'>
                    <LockIcon titleAccess='Sorry this repository is private :(' htmlColor={darkMode ? 'black' : 'white'}/>
                    <img src={react} alt="" style={{width: 22}} />
                    <img src={material} alt="" style={{width: 22}} />
                    <img src={darkMode? ex2 : ex} alt="" style={{width: 22}} />
                    <img src={mysql} alt="" style={{width: 22}} />
                </div>
            </Paper>
            <Paper elevation={8} className={darkMode ? 'project d-flex flex-column justify-content-around p-3' : 'projectTransparent d-flex flex-column justify-content-around p-3'}>
                <img className='img-fluid rounded-2' src={equipaPic} alt="" />
                <h3 className={`m-2 titulo-project ${textColor}`}>Equipasis</h3>
                <p className={`description p-2 m-0a ${textColor}`}>Equipasis is a private project in which I participated in 2024, this application was made to keep information about medical assets, this app contains notifications, scheduler, graphs and more.</p>
                <div className='mx-2 my-4 d-flex gap-2'>
                    <LockIcon titleAccess='Sorry this repository is private :(' htmlColor={darkMode ? 'black' : 'white'}/>
                    <img src={react} alt="" style={{width: 22}} />
                    <img src={material} alt="" style={{width: 22}} />
                    <img src={mysql} alt="" style={{width: 22}} />
                </div>
            </Paper>
            <Paper elevation={8} style={{cursor: 'pointer'}} onClick={irAlGithub} className={darkMode ? 'project d-flex flex-column justify-content-around p-3' : 'projectTransparent d-flex flex-column justify-content-around p-3'}>
                <img className='img-fluid rounded-2' src={todopic} alt="" />
                <h3 className={`m-2 titulo-project ${textColor}`}>TobDo</h3>
                <p className={`description p-2 m-0a ${textColor}`}>TobDo-List is a task management application that provides a comprehensive experience for efficiently organizing your day. Designed with simplicity and functionality in mind.</p>
                <div className='mx-2 my-4 d-flex gap-2 align-items-center'>
                    <GitHubIcon titleAccess='Repository on GitHub' htmlColor={darkMode ? 'black' : 'white'}/>
                    <img src={android} alt="" style={{width: 22}} />
                    <AppleIcon titleAccess='Soon on the App Store' htmlColor={darkMode ? 'black' : 'white'}/>
                    <img src={react} alt="" style={{width: 22, height: 20}} />
                    <img src={expo} alt="" style={{width: 18, height: 20}} />
                </div>
            </Paper>
            <Paper elevation={8} className={darkMode ? 'project d-flex flex-column justify-content-around p-3' : 'projectTransparent d-flex flex-column justify-content-around p-3'}>
                <img className='img-fluid rounded-2' src={comPic} alt="" />
                <h3 className={`m-2 titulo-project ${textColor}`}>SysCOM</h3>
                <p className={`description p-2 m-0a ${textColor}`}>SysCOM is a private project in which I participated in 2023, this application was made to create security reports for the municipality of my city.</p>
                <div className='mx-2 my-4 d-flex gap-2'>
                    <LockIcon titleAccess='Sorry this repository is private :(' htmlColor={darkMode ? 'black' : 'white'}/>
                    <img src={react} alt="" style={{width: 22}} />
                    <img src={darkMode? ex2 : ex} alt="" style={{width: 22}} />
                    <img src={mongo} alt="" style={{width: 22, height: 22}} />
                </div>
            </Paper>
        </div>
    </section>
  )
}

export default Projects