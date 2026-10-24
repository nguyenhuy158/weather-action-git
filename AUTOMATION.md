# Weather tracker automation

## What runs

Pipi runs `job-weather-tracker.timer` at 00:00 and 12:00 UTC. Its service fetches a fresh response from OpenWeather's current-weather endpoint on every run, using `q=vietnam` and metric units. It keeps no weather cache. The API's `dt` value supplies the observation time shown in ICT. This is one OpenWeather location, not a forecast for all of Vietnam.

The job renders `README.md` from that response. If the file is unchanged, it logs `weather unchanged` and makes no commit. If it changes, the job opens an `automation/weather-*` pull request into `main`, squash merges it, and deletes the branch. An earlier open weather PR stops the job so updates cannot pile up. `README.md` is generated; change its template in vm-setup rather than editing it here.

The job source, timer schedule, and deployment configuration live in the private [infra-vm-setup](https://github.com/nguyenhuy158/infra-vm-setup) repository at `setup.d/85-jobs.sh` and `hosts/pipi.env`. This repository has no GitHub Actions workflow or Node runtime. Its default branch requires a pull request, permits squash merge, and deletes merged branches.

## Configuration and deployment

`OPENWEATHER_API_KEY` is stored in BWS and exposed to the job through Pipi's fnox global config. Root's `gh auth` provides GitHub access. Do not put secret values in this repository, PRs, commands, or logs.

After changing the job source or schedule, apply it from the vm-setup checkout:

```bash
make setup HOST=pipi STEPS=jobs
```

## Verify a run

```bash
ssh pipi 'systemctl is-enabled job-weather-tracker.timer && systemctl is-active job-weather-tracker.timer'
ssh pipi 'sudo systemctl start job-weather-tracker.service'
make logs HOST=pipi JOB=weather-tracker N=20
make doctor-q HOST=pipi
```

A successful service run with `weather unchanged` needs no PR. For changed data, check the [merged weather PRs](https://github.com/nguyenhuy158/weather-tracker/pulls?q=is%3Apr+is%3Amerged) and the observation time in `README.md`. Doctor reports whether the job and timer are installed; the service log and README confirm the fetch and publication. On failure, inspect the service log, fnox secret mapping, root's `gh auth`, and any open `automation/weather-*` PR before retrying.

The renamed service was verified on Pipi on 24 October 2026: [vm-setup PR #44](https://github.com/nguyenhuy158/infra-vm-setup/pull/44) installed it, and the new service updated this README through [weather PR #12](https://github.com/nguyenhuy158/weather-tracker/pull/12).
