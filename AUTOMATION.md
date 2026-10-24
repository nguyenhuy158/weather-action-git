# Weather README automation

`README.md` is generated from the current OpenWeather response for `q=vietnam` with metric temperatures. The job fetches fresh data at 00:00 and 12:00 UTC. If the rendered README is unchanged, it records `weather unchanged` and creates no commit. Otherwise it creates an `automation/weather-*` branch, opens a pull request into `main`, squash merges it, and deletes the branch.

The scheduler and job source live in the private [infra-vm-setup](https://github.com/nguyenhuy158/infra-vm-setup) repository: `setup.d/85-jobs.sh` and `hosts/pipi.env`. GitHub Actions no longer schedules this repository. The default branch requires a pull request and allows only squash merge.

`OPENWEATHER_API_KEY` is held in BWS and mapped through the private `dotfiles-chezmoi` fnox global config. Its value must not be placed in this repository, a pull request, or logs.

To trigger and inspect a run from the vm-setup checkout:

```bash
ssh pipi 'sudo systemctl start job-weather-action-git.service'
make logs HOST=pipi JOB=weather-action-git N=20
make doctor-q HOST=pipi
```

Check the [pull requests](https://github.com/nguyenhuy158/weather-tracker/pulls?q=is%3Apr+is%3Amerged) and `README.md` after a changed report. A successful run with `weather unchanged` leaves the branch at the same commit. On failure, inspect the service log and any open `automation/weather-*` PR before rerunning; the job stops when an earlier weather PR remains open.
