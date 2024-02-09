

export const elementsPerPage = async (request, context) => {
  request.query.perPage = 100;
  return request
}
