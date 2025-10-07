FROM node:lts AS base
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/
WORKDIR /pixelwar
COPY .python-version pyproject.toml uv.lock ./
RUN uv sync
ENV UV_FROZEN=1

FROM base AS frontend-builder
COPY package*.json ./
RUN npm install
COPY tsconfig.json vite.config.ts manage.py ./
COPY proj ./proj
COPY pixelwar ./pixelwar
COPY frontend ./frontend
RUN SECRET_KEY=django-insecure-build uv run npm run build

FROM base
COPY manage.py ./
COPY proj ./proj
COPY pixelwar ./pixelwar
COPY --from=frontend-builder /pixelwar/staticfiles ./staticfiles
RUN SECRET_KEY=django-insecure-build uv run ./manage.py collectstatic --noinput
COPY entrypoint.sh ./
RUN chmod +x ./entrypoint.sh
EXPOSE 8000
ENTRYPOINT ["./entrypoint.sh"]
CMD ["daphne", "-b", "0.0.0.0", "-p", "8000", "proj.asgi:application"]