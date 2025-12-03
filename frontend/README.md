To run the HRMS frontend development server and connect it to your Frappe backend, follow these steps:

Set `socketio_port` to `8080` in the common_site_config.json and run:

```bash
cd /workspace/frappe-bench/apps/hrms/frontend
yarn dev --host 0.0.0.0
```
