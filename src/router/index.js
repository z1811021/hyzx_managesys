import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import main from '@/components/main';

import m_index_info_gl from '@/components/store/m_index_info_gl';
import s_index from '@/components/store/s_index';
import s_check from '@/components/store/s_check';
import s_datile from '@/components/store/s_datile';
import m_index_set from '@/components/member/m_index_set';
import m_index_info from '@/components/member/m_index_info';
import p_index from '@/components/project/p_index';
import p_plan_index from '@/components/project/p_plan_index';
import p_meal_index from '@/components/project/p_meal_index';
import p_symptom from '@/components/project/p_symptom';
import p_program from '@/components/project/p_program';
import c_index from '@/components/custem/c_index';
import e_index from '@/components/empty/e_index';
import t_index from '@/components/table/t_index';
import sa_index from '@/components/salary/sa_index';
import sa_index2 from '@/components/salary/sa_index2';

import cr_index from '@/components/card/cr_m';
import tk_m from '@/components/card/tk_m';
import hd_m from '@/components/card/hd_m';
import lc_m from '@/components/card/lc_m';
import cp_m from '@/components/card/cp_m';
import login from '@/components/user/login'
import register from '@/components/user/register'
import register_1 from '@/components/user/register_1'
import register_2 from '@/components/user/register_2'
import register_3 from '@/components/user/register_3'
import register_4 from '@/components/user/register_4'
import register_5 from '@/components/user/register_5'
import register_6 from '@/components/user/register_6'
import register_7 from '@/components/user/register_7'
import register_8 from '@/components/user/register_8'
import registerResult from '@/components/user/registerResult'
import forget from '@/components/user/forget'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/main',
      redirect: '/s_index',
      name: 'main',
      component: main,
      children: [
        {
          path: '/s_check',
          name: 's_check',
          component: s_check,
        },
        {
          path: 'm_index_info_gl',
          name: 'm_index_info_gl',
          component: m_index_info_gl,
        },
        {
          path: '/s_index',
          name: 's_index',
          component: s_index,
        },
        {
          path: '/s_datile/:id',
          name: 's_datile',
          redirect: 's_datile/:id/m_index_set',
          component: s_datile,
          children: [
            {
              path: 'm_index_set',
              name: 'm_index_set',
              component: m_index_set,
            },
            {
              path: 'm_index_info',
              name: 'm_index_info',
              component: m_index_info,
            },
            {
              path: 'p_index',
              name: 'p_index',
              component: p_index,
            },
            {
              path: 'p_plan_index',
              name: 'p_plan_index',
              component: p_plan_index,
            },
            {
              path: 'p_meal_index',
              name: 'p_meal_index',
              component: p_meal_index,
            },
            {
              path: 'p_symptom',
              name: 'p_symptom',
              component: p_symptom,
            },
            {
              path: 'p_program',
              name: 'p_program',
              component: p_program,
            },
            {
              path: 'c_index',
              name: 'c_index',
              component: c_index,
            },
            {
              path: 'e_index',
              name: 'e_index',
              component: e_index,
            },
            {
              path: 'sa_index',
              name: 'sa_index',
              component: sa_index,
            },
            {
              path: 'sa_index2',
              name: 'sa_index2',
              component: sa_index2,
            },
            {
              path: 't_index',
              name: 't_index',
              component: t_index,
            },

            {
              path: 'tk_m',
              name: 'tk_m',
              component: tk_m,
            },
            {
              path: 'hd_m',
              name: 'hd_m',
              component: hd_m,
            },
            {
              path: 'lc_m',
              name: 'lc_m',
              component: lc_m,
            },
            {
              path: 'cp_m',
              name: 'cp_m',
              component: cp_m,
            },
            {
              path: 'cr_index',
              name: 'cr_index',
              component: cr_index,
            },
          ],
        },
      ],
    },
    {
      path:'/',
      name: 'login',
      component: login,
    },
    {
      path: '/login',
      name: 'login',
      component: login,
    },
    {
      path: '/register',
      redirect: '/register_1',
      name: 'register',
      component: register,
      children: [
        {
        path: '/register_1',
        name: 'register_1',
        component: register_1,
        },
        {
        path: '/register_2',
        name: 'register_2',
        component: register_2,
        },
        {
        path: '/register_3',
        name: 'register_3',
        component: register_3,
        },
        {
        path: '/register_4',
        name: 'register_4',
        component: register_4,
        },
        {
        path: '/register_5',
        name: 'register_5',
        component: register_5,
        },
       {
        path: '/register_6',
        name: 'register_6',
        component: register_6,
        },
       {
        path: '/register_7',
        name: 'register_7',
        component: register_7,
        },
        {
        path: '/register_8',
        name: 'register_8',
        component: register_8
        }
      ]
    },
    {
      path: '/registerResult',
      name: 'registerResult',
      component: registerResult,
    },
    {
      path: '/forget',
      name: 'forget',
      component: forget,
    },
  ]
})
