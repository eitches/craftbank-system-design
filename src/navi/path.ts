import { buildQuery } from "./buildQuery";
import type { QueryParams } from "./queryParams";

export const path = {
  auth: {
    login: (params?: QueryParams) => `/login${buildQuery(params)}`,
  },
  api: {
    companies: {
      search: (params?: QueryParams) =>
        `/api/companies/search${buildQuery(params)}`,
    },
  },
  user: {
    top: (params?: QueryParams) => `/${buildQuery(params)}`,
    conversation: {
      root: () => "/conversation",
      detail: (params: { id: string }) => `/conversation/${params.id}`,
    },
    detail: ({ userId }: { userId: string }) => `/user/${userId}`,
    portfolio: {
      root: ({ userId }: { userId: string }) => `/user/${userId}/portfolio`,
      list: (params?: QueryParams) => `/article${buildQuery(params)}`,
      detail: (params: { slug: string; id: string }) =>
        `/article/${params.slug}-${params.id}`,
      edit: (params: { id: string }) => `/article/${params.id}/edit`,
    },
    company: {
      list: (params?: QueryParams) => `/company${buildQuery(params)}`,
      reputation: {
        top: (params: { companyId: string }) =>
          `/company/${params.companyId}/reputation`,
        portfolio: (params: { companyId: string }) =>
          `/company/${params.companyId}/reputation/portfolio`,
        job: (params: { companyId: string }) =>
          `/company/${params.companyId}/reputation/job`,
        review: (params: { companyId: string }) =>
          `/company/${params.companyId}/reputation/review`,
        salary: (params: { companyId: string }) =>
          `/company/${params.companyId}/reputation/salary`,
      },
    },
    job: {
      list: (params?: QueryParams) => `/job${buildQuery(params)}`,
      detail: (params: { id: string }) => `/job/${params.id}`,
    },
    setting: {
      profile: () => "/setting/profile",
      portfolio: {
        root: (params?: QueryParams) =>
          `/setting/portfolio${buildQuery(params)}`,
        bookmark: (params?: QueryParams) =>
          `/setting/portfolio/bookmark${buildQuery(params)}`,
      },
    },
    createEnterprise: () => "/create-enterprise",
    writeReview: (params: { companyId: string }) =>
      `/write-review/${params.companyId}`,
  },
  enterprise: {
    top: (params?: QueryParams) => `/enterprise${buildQuery(params)}`,
    scout: (params?: QueryParams) => `/enterprise/scout${buildQuery(params)}`,
    job: {
      list: (params?: QueryParams) => `/enterprise/job${buildQuery(params)}`,
      create: () => "/enterprise/job/create",
      edit: (params: { id: string }) => `/enterprise/job/${params.id}/edit`,
      preview: (params: { id: string }) =>
        `/enterprise/job/${params.id}/preview`,
    },
    conversation: {
      root: () => "/enterprise/conversation",
      detail: (params: { id: string }) =>
        `/enterprise/conversation/${params.id}`,
    },
    setting: {
      profile: (params?: QueryParams) =>
        `/enterprise/setting/profile${buildQuery(params)}`,
      userList: (params?: QueryParams) =>
        `/enterprise/setting/user-list${buildQuery(params)}`,
      plan: (params?: QueryParams) =>
        `/enterprise/setting/plan${buildQuery(params)}`,
    },
    order: {
      list: (params?: QueryParams) => `/enterprise/order${buildQuery(params)}`,
      detail: (params: { id: string }) => `/enterprise/order/${params.id}`,
      create: () => "/enterprise/order/new",
      constructors: {
        list: (params?: QueryParams) =>
          `/enterprise/order/constructors${buildQuery(params)}`,
        detail: (params: { id: string }) =>
          `/enterprise/order/constructors/${params.id}`,
      },
    },
  },
};
